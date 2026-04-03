function sendText() {
  let text = document.getElementById("txt").value;
  if (text === "") return;

  // Crée une nouvelle bulle droite
  const bubble = document.createElement("div");
  bubble.classList.add("bubble-right");
  bubble.style.display = "block";


    // pour la securité, on peut échapper les caractères spéciaux pour éviter les attaques XSS
    let p = document.createElement("p");
    p.textContent = text;
    bubble.appendChild(p);
      
  const chatWrap = document.getElementById("chat-wrap");
  if (chatWrap) {
    chatWrap.appendChild(bubble);
    chatWrap.scrollTop = chatWrap.scrollHeight;
  }
  
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(text);
  } else {
    console.log("WebSocket pas encore prêt");
  }
  document.getElementById("txt").value = "";
}

const backendBaseUrl = "https://chatbox-xjt3.onrender.com";
const socketUrl = `${backendBaseUrl.replace(/^http/, "ws")}/ws`;
const socket = new WebSocket(socketUrl);

socket.onopen = () => {
  console.log('Connecté au serveur');
};

socket.onerror = () => {
  console.log("Erreur WebSocket:", socketUrl);
};


socket.onmessage = (event) => {
  console.log('Reçu :', event.data);

  //  Crée une nouvelle bulle gauche
  const bubble = document.createElement("div");
  bubble.classList.add("bubble-left");
  bubble.style.display = "block";
  // pour la securité, on peut échapper les caractères spéciaux pour éviter les attaques XSS
  let p = document.createElement("p");
  p.textContent = event.data;
  bubble.appendChild(p);
  
  const chatWrap = document.getElementById("chat-wrap");
  if (chatWrap) {
    chatWrap.appendChild(bubble);
    chatWrap.scrollTop = chatWrap.scrollHeight;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("txt");

  if (sendBtn) {
    sendBtn.addEventListener("click", sendText);
  }

  if (input) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sendText();
      }
    });
  }
});


