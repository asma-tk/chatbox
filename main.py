from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
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

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("index.html", "r") as f:
        return f.read()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)