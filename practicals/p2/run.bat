@echo off
title Practical 02 - Props State and Events
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 02 - Props State and Events
echo   URL: http://localhost:5175
echo ========================================================
echo Starting development server...
start http://localhost:5175
call npm.cmd run dev
pause
