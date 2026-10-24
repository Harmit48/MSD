import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import AppBar from './components/AppBar';

const socket = io.connect('http://localhost:5012');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [inChat, setInChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [typingUser, setTypingUser] = useState('');

  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      socket.emit('join_room', { username, room });
      setInChat(true);
    }
  };

  const sendMessage = async () => {
    if (currentMessage.trim()) {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
      socket.emit('typing', { room, username: '' }); // Clear typing
    }
  };

  const handleTyping = (e) => {
    setCurrentMessage(e.target.value);
    socket.emit('typing', { room, username: e.target.value ? username : '' });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on('system_message', (data) => {
      setMessageList((list) => [...list, { isSystem: true, ...data }]);
    });

    socket.on('user_typing', (data) => {
      setTypingUser(data.username);
    });

    return () => {
      socket.off('receive_message');
      socket.off('system_message');
      socket.off('user_typing');
    };
  }, []);

  return (
    <>
    <AppBar practical="12" />
    <div className="chat-app-wrapper">
      {!inChat ? (
        <div className="join-chat-card">
          <span className="eyebrow">Practical 12 · WebSockets</span>
          <h2>Real-Time Chat Portal</h2>
          <p>Instant bidirectional communication with Socket.IO.</p>
          <input
            type="text"
            placeholder="Screen name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room code (e.g. MSD_LAB)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom} className="join-btn">Join Chat Room</button>
        </div>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <div>
              <h3>Room: #{room}</h3>
              <span className="live-status">● Live · WebSocket connected</span>
            </div>
            <span className="logged-user">{username}</span>
          </div>

          <div className="message-container">
            {messageList.map((msg, idx) => (
              msg.isSystem ? (
                <div key={idx} className="system-bubble">{msg.text} ({msg.time})</div>
              ) : (
                <div key={idx} className={`message-bubble ${msg.author === username ? 'self' : 'peer'}`}>
                  <div className="msg-author">{msg.author}</div>
                  <div className="msg-text">{msg.message}</div>
                  <div className="msg-time">{msg.time}</div>
                </div>
              )
            ))}
            {typingUser && <div className="typing-indicator">{typingUser} is typing…</div>}
          </div>

          <div className="chat-input-bar">
            <input
              type="text"
              placeholder="Type your message..."
              value={currentMessage}
              onChange={handleTyping}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="send-btn">Send</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;