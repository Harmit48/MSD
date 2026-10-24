@echo off
title Practical 05 - Express Routing and CRUD Operations
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 05 (Express CRUD API Server)
echo   URL: http://localhost:5005
echo ========================================================
if not exist node_modules ( call npm.cmd install )
start "" cmd /c "timeout /t 2 /nobreak > nul & start http://localhost:5005"
node server.js
pause
