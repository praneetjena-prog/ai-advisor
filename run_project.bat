@echo off
title AI Advisor - Full-Stack Launcher
echo ========================================================
echo   AI Advisor - Setup and Launch Console
echo ========================================================
echo.

:: Check Python
echo [1/4] Checking Python environment...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH. Please install Python.
    pause
    exit /b
)
echo Python detected. Installing Python dependencies...
python -m pip install fastapi uvicorn pydantic
echo.

:: Check Node
echo [2/4] Checking Node.js environment...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH. Please install Node.js.
    pause
    exit /b
)
echo Node.js detected.
echo.

:: Setup Frontend
echo [3/4] Building frontend static assets...
if not exist "frontend\node_modules\" (
    echo node_modules not found in frontend. Installing now...
    cd frontend && npm install && npm run build && cd ..
) else (
    echo Building React files...
    cd frontend && npm run build && cd ..
)
echo.

:: Launch Services
echo [4/4] Starting servers...
echo.
echo Starting Integrated FastAPI Server on http://127.0.0.1:8080 ...
start "AI Advisor - Integrated Server" cmd /k "cd backend && uvicorn main:app --host 127.0.0.1 --port 8080 --reload"

echo.
echo Waiting 3 seconds for server to initialize...
timeout /t 3 /nobreak >nul

echo Opening browser to AI Advisor...
start http://localhost:8080

echo.
echo ========================================================
echo   Launcher complete! The integrated FastAPI server is
echo   running in the background. Keep this window open if you 
echo   want, or you can close it. To stop, close the spawned 
echo   Integrated Server console.
echo ========================================================
echo.
pause
