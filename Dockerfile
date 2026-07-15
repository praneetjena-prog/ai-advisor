# Step 1: Build the React frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Step 2: Set up the Python backend
FROM python:3.10-slim
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY backend/ ./backend

# Copy the compiled React assets from the frontend build stage
COPY --from=frontend-builder /frontend/dist ./frontend/dist

# Expose FastAPI's default port
EXPOSE 8080

# Command to run uvicorn
CMD ["python", "backend/main.py"]
