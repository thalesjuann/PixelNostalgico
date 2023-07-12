document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const scoreElement = document.getElementById('score');
  const gameOverElement = document.getElementById('game-over');
  const startButton = document.getElementById('start-button');

  let botaoreinicio;
  let tileSize = 20;
  let gameSize = 400;
  let initialSnakeLength = 3;
  let snakeSpeed = 150;

  let snake = [];
  let food = {};
  let direction = 'right';
  let gameTimer;
  let score = 0;

  function startGame() {
    snake = [];
    direction = 'right';
    score = 0;
    createSnake();
    createFood();
    clearInterval(gameTimer);
    gameTimer = setInterval(moveSnake, snakeSpeed);
    gameOverElement.style.display = 'none';
    scoreElement.innerText = 'Pontuação: 0';
    startButton.style.display = 'none';
  }

  function showInstructions() {
    const instructionsElement = document.getElementById('instructions');
    instructionsElement.style.display = 'block';
    startButton.style.display = 'none';

    setTimeout(() => {
      instructionsElement.style.display = 'none';
      startGame();
    }, 5000);
  }

  function createSnake() {
    const startX = Math.floor((gameSize / tileSize) / 2) * tileSize;
    const startY = Math.floor((gameSize / tileSize) / 2) * tileSize;

    for (let i = 0; i < initialSnakeLength; i++) {
      const segment = { x: startX - (i * tileSize), y: startY };
      snake.push(segment);
    }
  }

  function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
      case 'up':
        head.y -= tileSize;
        break;
      case 'down':
        head.y += tileSize;
        break;
      case 'left':
        head.x -= tileSize;
        break;
      case 'right':
        head.x += tileSize;
        break;
    }

    if (hasCollision(head)) {
      gameOver();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreElement.innerText = 'Pontuação: ' + score;
      createFood();
    } else {
      snake.pop();
    }

    render();
  }

  function hasCollision(head) {
    if (
      head.x < 0 || head.x >= gameSize ||
      head.y < 0 || head.y >= gameSize ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      return true;
    }

    return false;
  }

  function createFood() {
    const maxX = gameSize / tileSize;
    const maxY = gameSize / tileSize;

    let foodX, foodY;

    do {
      foodX = Math.floor(Math.random() * maxX) * tileSize;
      foodY = Math.floor(Math.random() * maxY) * tileSize;
    } while (snake.some(segment => segment.x === foodX && segment.y === foodY));

    food = {
      x: foodX,
      y: foodY
    };
  }

  function gameOver() {
    clearInterval(gameTimer);
    gameOverElement.style.display = 'block';
    gameOverElement.innerHTML = `Fim de Jogo!<br>Pontuação Final: ${score}<br>`;
    gameOverElement.innerHTML += `<button id="botaoreinicio">Reiniciar</button>`;
    botaoreinicio = document.getElementById('botaoreinicio');
    botaoreinicio.addEventListener('click', startGame);
  }

  function render() {
    gameBoard.innerHTML = '';

    snake.forEach(segment => {
      const segmentElement = document.createElement('div');
      segmentElement.className = 'snake-segment';
      segmentElement.style.left = segment.x + 'px';
      segmentElement.style.top = segment.y + 'px';
      gameBoard.appendChild(segmentElement);
    });

    const foodElement = document.createElement('div');
    foodElement.id = 'food';
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    gameBoard.appendChild(foodElement);
  }

  document.addEventListener('keydown', event => {
    const key = event.key;

    if (key === 'ArrowUp' && direction !== 'down') {
      direction = 'up';
    } else if (key === 'ArrowDown' && direction !== 'up') {
      direction = 'down';
    } else if (key === 'ArrowLeft' && direction !== 'right') {
      direction = 'left';
    } else if (key === 'ArrowRight' && direction !== 'left') {
      direction = 'right';
    }
  });

  // Evento de clique para o botão "startButton"
  startButton.addEventListener('click', showInstructions);
});

