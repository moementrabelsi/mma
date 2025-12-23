@echo off
echo ========================================
echo   Demarrage du Backend MMA Agriculture
echo ========================================
echo.
cd /d %~dp0
echo Verifying Node.js installation...
node --version
echo.
echo Installing dependencies if needed...
call npm install
echo.
echo Starting server...
echo.
node src/server.js
pause



