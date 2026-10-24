import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from './components/AppBar';

const API_BASE = 'http://localhost:5010/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(true);

  // 1. Fetch tasks from Express Backend on Mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_BASE);
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Failed to load tasks from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Create Task -> POST to Backend -> MongoDB
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post(API_BASE, { title, priority, status: 'Pending' });
      setTasks([res.data.task, ...tasks]);
      setTitle('');
    } catch (err) {
      alert("Error adding task");
    }
  };

  // 3. Toggle Status -> PUT to Backend
  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      const res = await axios.put(`${API_BASE}/${task._id}`, { status: nextStatus });
      setTasks(tasks.map(t => t._id === task._id ? res.data.task : t));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // 4. Delete Task -> DELETE to Backend
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <>
    <AppBar practical="10" />
    <div className="mern-container">
      <header className="page-head">
        <span className="eyebrow">Practical 10 · Full-Stack MERN</span>
        <h1>Project Task Manager</h1>
        <p>React frontend, Express API and MongoDB database working together.</p>
      </header>

      <form onSubmit={handleCreateTask} className="task-input-bar">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-select">
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <button type="submit" className="add-task-btn">Add task</button>
      </form>

      <div className="tasks-grid">
        {loading ? <p className="tasks-empty">Connecting to backend…</p> : tasks.length === 0 ? <p className="tasks-empty">No tasks yet. Add your first task above.</p> : tasks.map((task) => (
          <div key={task._id} className={`task-card ${task.status === 'Completed' ? 'done' : ''}`}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.status === 'Completed'}
                onChange={() => handleToggleStatus(task)}
              />
              <span className="task-title">{task.title}</span>
            </div>
            <div className="task-meta">
              <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
              <button onClick={() => handleDelete(task._id)} className="task-del-btn" aria-label="Delete task">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <p className="footer">Harmit Suthar (23084231044) · Practical 10</p>
    </div>
    </>
  );
}

export default App;