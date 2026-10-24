@echo off
title Practical 07 - Employee Management API (MongoDB)
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 07 (Employee Management MongoDB API)
echo   URL: http://localhost:5007
echo ========================================================
if not exist node_modules ( call npm.cmd install )
start "" cmd /c "timeout /t 2 /nobreak > nul & start http://localhost:5007"
node server.js
pause
