@echo off
title Practical 04 - React Router SPA
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 04 - React Router SPA
echo   URL: http://localhost:5177
echo ========================================================
echo Starting development server...
start http://localhost:5177
call npm.cmd run dev
pause
