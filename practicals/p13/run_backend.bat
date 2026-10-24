@echo off
title DocuVault Backend (Express API)
cd /d "%~dp0server"
echo =========================================================
echo   Starting Express Backend on http://localhost:5013...
echo =========================================================
if not exist node_modules ( call npm.cmd install )
node server.js
pause
