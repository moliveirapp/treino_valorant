const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("startGame");

let speed = 1000; // Intervalo entre aparições (ms)
let size = 50; // Tamanho dos pontos
let maxTargets = 10; // Número de aparições
let hits = 0;
let misses = 0;
let currentTargets = 0;
let interval;

function updateScore() {
  scoreDisplay.textContent = `Acertos: ${hits} | Erros: ${misses}`;
}

function createPoint(color) {
  const point = document.createElement("div");
  point.classList.add("point", color);
  point.style.width = `${size}px`;
  point.style.height = `${size}px`;
  point.style.top = `${Math.random() * (gameArea.offsetHeight - size)}px`;
  point.style.left = `${Math.random() * (gameArea.offsetWidth - size)}px`;

  point.addEventListener("click", () => {
    if (color === "green") hits++;
    else misses++;
    updateScore();
    point.remove();
  });

  gameArea.appendChild(point);

  setTimeout(() => point.remove(), 1000); // Remove o ponto após 1 segundo
}

function startGame() {
  hits = 0;
  misses = 0;
  currentTargets = 0;
  updateScore();

  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    if (currentTargets >= maxTargets) {
      clearInterval(interval);
      alert("Jogo terminado!");
      return;
    }
    createPoint("green");
    createPoint("red");
    currentTargets++;
  }, speed);
}

function adjustSpeed(amount) {
  speed = Math.max(200, speed + amount);
}

function adjustSize(amount) {
  size = Math.max(10, size + amount);
}

function adjustTargets(amount) {
  maxTargets = Math.max(1, maxTargets + amount);
}

// Botões de controle
document
  .getElementById("increaseSpeed")
  .addEventListener("click", () => adjustSpeed(-200));
document
  .getElementById("decreaseSpeed")
  .addEventListener("click", () => adjustSpeed(200));
document
  .getElementById("increaseSize")
  .addEventListener("click", () => adjustSize(10));
document
  .getElementById("decreaseSize")
  .addEventListener("click", () => adjustSize(-10));
document
  .getElementById("increaseTargets")
  .addEventListener("click", () => adjustTargets(5));
document
  .getElementById("decreaseTargets")
  .addEventListener("click", () => adjustTargets(-5));
startButton.addEventListener("click", startGame);
