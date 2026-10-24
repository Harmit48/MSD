@echo off
title Practical 12 - Real-Time Chat with Socket.IO
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 12 (Socket.IO Real-Time Chat)
echo   Socket Server: http://localhost:5012
echo   Web Client:    http://localhost:5179
echo ========================================================
echo Starting Socket.IO Server on port 5012...
start "Socket Server (Port 5012)" cmd /k "cd /d ""%~dp0server"" && node server.js"
timeout /t 2 /nobreak > nul
echo Starting React Vite Client on port 5179...
start "" cmd /c "timeout /t 3 /nobreak > nul & start http://localhost:5179"
start "Chat Client (Port 5179)" cmd /k "cd /d ""%~dp0client"" && npm.cmd run dev"
echo.
echo Both Socket Server and Web Client have been started!
pause
