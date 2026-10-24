@echo off
title Practical 10 - Complete Full-Stack MERN
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 10 (Full-Stack MERN App)
echo   Backend API:  http://localhost:5010
echo   Frontend App: http://localhost:5178
echo ========================================================
echo Starting Express Backend on port 5010...
start "MERN Backend (Port 5010)" cmd /k "cd /d ""%~dp0backend"" && node server.js"
timeout /t 2 /nobreak > nul
echo Starting React Vite Frontend on port 5178...
start "" cmd /c "timeout /t 3 /nobreak > nul & start http://localhost:5178"
start "MERN Frontend (Port 5178)" cmd /k "cd /d ""%~dp0frontend"" && npm.cmd run dev"
echo.
echo Both Backend and Frontend have been launched in separate windows!
echo Browser will automatically open http://localhost:5178
pause
