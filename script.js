const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("startGame");
const speedDisplay = document.getElementById("speedDisplay");
const sizeDisplay = document.getElementById("sizeDisplay");
const targetsDisplay = document.getElementById("targetsDisplay");

let speed = 6; // Velocidade inicial
let size = 2; // Índice do tamanho no array (inicia em 'Médio')
let targetCount = 30; // Quantidade de alvos
let hits = 0;
let misses = 0;


<<<<<<< HEAD

=======
>>>>>>> d692867d4ecce4c269a21e891d8494cb41a084b9
const sizes = ["Minúsculo", "Muito Pequeno", "Pequeno", "Médio", "Grande"];
const sizeValues = [10, 20, 30, 40, 50]; // Tamanhos dos alvos em pixels
const speedIntervals = [2000, 1500, 1200, 1000, 800, 600, 500, 400, 300, 200]; // Intervalos em ms para cada velocidade (1 a 10)

// Atualizar o marcador das configurações
function updateSettingsDisplay() {
  speedDisplay.textContent = speed;
  sizeDisplay.textContent = sizes[size];
  targetsDisplay.textContent = targetCount;
}

// Botões para controle
document.getElementById("increaseSpeed").addEventListener("click", () => {
  if (speed < 10) speed++;
  updateSettingsDisplay();
});

document.getElementById("decreaseSpeed").addEventListener("click", () => {
  if (speed > 1) speed--;
  updateSettingsDisplay();
});

document.getElementById("increaseSize").addEventListener("click", () => {
  if (size < sizes.length - 1) size++;
  updateSettingsDisplay();
});

document.getElementById("decreaseSize").addEventListener("click", () => {
  if (size > 0) size--;
  updateSettingsDisplay();
});

document.getElementById("increaseTargets").addEventListener("click", () => {
  targetCount += 5;
  updateSettingsDisplay();
});

document.getElementById("decreaseTargets").addEventListener("click", () => {
  if (targetCount > 5) targetCount -= 5;
  updateSettingsDisplay();
});

// Função para criar os pontos
function generatePoint(color) {
  const point = document.createElement("div");
  point.className = `point ${color}`;
  point.style.width = `${sizeValues[size]}px`;
  point.style.height = `${sizeValues[size]}px`;
  point.style.left = `${Math.random() * (gameArea.offsetWidth - sizeValues[size])}px`;
  point.style.top = `${Math.random() * (gameArea.offsetHeight - sizeValues[size])}px`;

  point.addEventListener("click", (event) => {
    event.stopPropagation(); // Evita que o clique seja registrado como um clique fora
    if (color === "green") hits++;
    else misses++;
    updateScore();
    removeAllPoints();
  });

  gameArea.appendChild(point);

  // Remove o ponto após 1 segundo
  setTimeout(() => {
    if (point.parentNode) point.remove();
  }, 1000);
}

// Atualizar a pontuação
function updateScore() {
  scoreDisplay.textContent = `Acertos: ${hits} | Erros: ${misses}`;
}

// Remove todos os pontos da tela
function removeAllPoints() {
  const points = document.querySelectorAll(".point");
  points.forEach((point) => point.remove());
}

// Detecta cliques fora dos pontos
gameArea.addEventListener("click", () => {
  misses++;
  updateScore();
  removeAllPoints();
});

// Lógica principal do jogo
startButton.addEventListener("click", () => {
  hits = 0;
  misses = 0;
  updateScore();

  let rounds = targetCount;
  const interval = speedIntervals[speed - 1]; // Define o intervalo baseado na velocidade

  function nextRound() {
    if (rounds <= 0) {
      alert("Treino finalizado!");
      return;
    }

    removeAllPoints(); // Remove os pontos anteriores
    generatePoint("green");
    generatePoint("red");

    rounds--;

    // Chama o próximo round após o intervalo
    setTimeout(nextRound, interval);
  }

  nextRound(); // Inicia o jogo
});

// Atualiza as configurações iniciais
updateSettingsDisplay();
