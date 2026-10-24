@echo off
title Practical 01 - React Components and Reusability
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 01 - React Components and Reusability
echo   URL: http://localhost:5174
echo ========================================================
echo Starting development server...
start http://localhost:5174
call npm.cmd run dev
pause
