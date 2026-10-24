@echo off
title Practical 06 - Student Records RESTful APIs
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 06 (Student Records REST API)
echo   URL: http://localhost:5006
echo ========================================================
if not exist node_modules ( call npm.cmd install )
start "" cmd /c "timeout /t 2 /nobreak > nul & start http://localhost:5006"
node server.js
pause
