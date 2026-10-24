@echo off
title DocuVault Frontend (React + Vite)
cd /d "%~dp0client"
echo =========================================================
echo   Starting React Vite Frontend on http://localhost:5173...
echo =========================================================
if not exist node_modules ( call npm.cmd install )
start "" cmd /c "timeout /t 3 /nobreak > nul & start http://localhost:5173"
call npm.cmd run dev
pause
