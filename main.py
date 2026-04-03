from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
import os
import uvicorn

app = FastAPI()

users = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    users.append(websocket)
    
    try:
        while True:
            data = await websocket.receive_text()
            
            # Envoie à l'autre personne uniquement
            for user in users:
                if user != websocket:
                    await user.send_text(data)
    
    except WebSocketDisconnect:
        users.remove(websocket)

# Serve static files (CSS, JS, images)
app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)