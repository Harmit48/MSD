@echo off
title Practical 08 - Express Middleware Pipeline
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 08 (Express Middleware Pipeline)
echo   URL: http://localhost:5008
echo ========================================================
if not exist node_modules ( call npm.cmd install )
start "" cmd /c "timeout /t 2 /nobreak > nul & start http://localhost:5008"
node server.js
pause
