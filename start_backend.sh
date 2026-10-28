#!/bin/bash
echo "[BACKEND] Releasing port 8000 if occupied..."
fuser -k 8000/tcp 2>/dev/null || true
sleep 1

echo "[BACKEND] Starting FastAPI on Port 8000..."
cd "$(dirname "$0")/backend"
python3 -m uvicorn app.main:app --reload --port 8000 --host 0.0.0.0
