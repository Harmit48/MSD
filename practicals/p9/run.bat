@echo off
title Practical 09 - Secure File Upload with Multer
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 09 (Multer File Upload Portal)
echo   URL: http://localhost:5009
echo ========================================================
if not exist node_modules ( call npm.cmd install )
start "" cmd /c "timeout /t 2 /nobreak > nul & start http://localhost:5009"
node server.js
pause
