@echo off
title Practical 03 - Student Forms and Validation
cd /d "%~dp0"
echo ========================================================
echo   Launching Practical 03 - Student Forms and Validation
echo   URL: http://localhost:5176
echo ========================================================
echo Starting development server...
start http://localhost:5176
call npm.cmd run dev
pause
