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
echo [3/4] Checking and installing frontend dependencies...
if not exist "frontend\node_modules\" (
    echo node_modules not found in frontend. Installing now...
    cd frontend && npm install && cd ..
) else (
    echo Frontend dependencies already installed.
)
echo.

:: Launch Services
echo [4/4] Starting servers...
echo.
echo Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "AI Advisor - FastAPI Backend" cmd /k "cd backend && uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

echo Starting Vite React Frontend on http://localhost:5173 ...
start "AI Advisor - Vite Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Waiting 3 seconds for servers to initialize...
timeout /t 3 /nobreak >nul

echo Opening browser to AI Advisor...
start http://localhost:5173

echo.
echo ========================================================
echo   Launcher complete! Both servers are running in the
echo   background. Keep this window open if you want, or
echo   you can close it. To stop, close the spawned consoles.
echo ========================================================
echo.
pause
