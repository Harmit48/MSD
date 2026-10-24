@echo off
title Practical 13 - DocuVault Enterprise DMS Mini Project
cd /d "%~dp0"
echo =========================================================
echo    STARTING DOCUVAULT ENTERPRISE MERN PLATFORM (P13)
echo    Backend API:  http://localhost:5013
echo    Frontend App: http://localhost:5173
echo =========================================================
echo 1. Launching Backend Server on port 5013...
start "DocuVault Backend (Port 5013)" "%~dp0run_backend.bat"

timeout /t 2 /nobreak > nul

echo 2. Launching Frontend Client on port 5173...
start "DocuVault Frontend (Port 5173)" "%~dp0run_frontend.bat"

echo =========================================================
echo Both servers are running! Check your browser at:
echo http://localhost:5173
echo =========================================================
