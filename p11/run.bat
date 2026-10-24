@echo off
title Practical 11 - Blog JWT and RBAC Controls
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 11 (Blog JWT Auth & RBAC Portal)
echo   URL: http://localhost:5011
echo ========================================================
if not exist node_modules ( call npm.cmd install )
start "" cmd /c "timeout /t 2 /nobreak > nul & start http://localhost:5011"
node server.js
pause
