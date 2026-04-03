function sendText() {
  let text = document.getElementById("txt").value;
  if (text === "") return;

  // Crée une nouvelle bulle droite
  const bubble = document.createElement("div");
  bubble.classList.add("bubble-right");
  bubble.style.display = "block";
  bubble.innerHTML = `<p>${text}</p>`;
  
  const chatWrap = document.getElementById("chat-wrap");
  if (chatWrap) {
    chatWrap.appendChild(bubble);
    chatWrap.scrollTop = chatWrap.scrollHeight;
  }
  
  socket.send(text);
  document.getElementById("txt").value = "";
}

const socket = new WebSocket('ws://127.0.0.1:8000/ws');

socket.onopen = () => {
  console.log('Connecté au serveur');
};


socket.onmessage = (event) => {
  console.log('Reçu :', event.data);

  //  Crée une nouvelle bulle gauche
  const bubble = document.createElement("div");
  bubble.classList.add("bubble-left");
  bubble.style.display = "block";
  bubble.innerHTML = `<p>${event.data}</p>`;
  
  const chatWrap = document.getElementById("chat-wrap");
  if (chatWrap) {
    chatWrap.appendChild(bubble);
    chatWrap.scrollTop = chatWrap.scrollHeight;
  }
};


