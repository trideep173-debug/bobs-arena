// ===== Snake Game Logic =====
const Snake = {
    canvas: null,
    ctx: null,
    gridSize: 20,
    tileCount: 20,
    snake: [],
    food: {},
    dx: 0,
    dy: 0,
    score: 0,
    gameLoop: null,
    gameActive: false,
    isPaused: false,
    timeLeft: 60,
    timerInterval: null,
    currentPlayerTurn: 1,
    speed: 100
};

function initSnake() {
    Snake.canvas = document.getElementById('snakeCanvas');
    Snake.ctx = Snake.canvas.getContext('2d');
    
    const startBtn = document.getElementById('startSnake');
    const pauseBtn = document.getElementById('pauseSnake');
    const resetBtn = document.getElementById('resetSnake');
    
    startBtn.addEventListener('click', startSnakeGame);
    pauseBtn.addEventListener('click', togglePauseSnake);
    resetBtn.addEventListener('click', resetSnake);
    
    // Keyboard controls
    document.addEventListener('keydown', handleSnakeKeyPress);
    
    updateSnakeStatus();
}

function startSnakeGame() {
    if (Snake.gameActive) return;
    
    // Initialize snake in the middle
    Snake.snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    
    Snake.dx = 1;
    Snake.dy = 0;
    Snake.score = 0;
    Snake.gameActive = true;
    Snake.isPaused = false;
    Snake.timeLeft = 60;
    Snake.currentPlayerTurn = GameState.currentPlayer;
    
    generateFood();
    
    // Update UI
    document.getElementById('startSnake').disabled = true;
    document.getElementById('pauseSnake').disabled = false;
    
    // Start game loop
    Snake.gameLoop = setInterval(updateSnakeGame, Snake.speed);
    
    // Start timer
    Snake.timerInterval = setInterval(updateSnakeTimer, 1000);
    
    updateSnakeStatus();
    logActivity(`${GameState.players[`player${Snake.currentPlayerTurn}`].name} started Snake game`);
}

function updateSnakeGame() {
    if (!Snake.gameActive || Snake.isPaused) return;
    
    // Move snake
    const head = { x: Snake.snake[0].x + Snake.dx, y: Snake.snake[0].y + Snake.dy };
    
    // Check wall collision
    if (head.x < 0 || head.x >= Snake.tileCount || head.y < 0 || head.y >= Snake.tileCount) {
        endSnakeGame('Hit the wall!');
        return;
    }
    
    // Check self collision
    if (Snake.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endSnakeGame('Hit yourself!');
        return;
    }
    
    // Add new head
    Snake.snake.unshift(head);
    
    // Check food collision
    if (head.x === Snake.food.x && head.y === Snake.food.y) {
        Snake.score += 10;
        generateFood();
        updateSnakeStatus();
        
        // Increase speed slightly
        if (Snake.score % 30 === 0 && Snake.speed > 50) {
            Snake.speed -= 10;
            clearInterval(Snake.gameLoop);
            Snake.gameLoop = setInterval(updateSnakeGame, Snake.speed);
        }
    } else {
        // Remove tail if no food eaten
        Snake.snake.pop();
    }
    
    drawSnake();
}

function drawSnake() {
    // Clear canvas
    Snake.ctx.fillStyle = '#0f3460';
    Snake.ctx.fillRect(0, 0, Snake.canvas.width, Snake.canvas.height);
    
    // Draw grid
    Snake.ctx.strokeStyle = '#16213e';
    for (let i = 0; i <= Snake.tileCount; i++) {
        Snake.ctx.beginPath();
        Snake.ctx.moveTo(i * Snake.gridSize, 0);
        Snake.ctx.lineTo(i * Snake.gridSize, Snake.canvas.height);
        Snake.ctx.stroke();
        
        Snake.ctx.beginPath();
        Snake.ctx.moveTo(0, i * Snake.gridSize);
        Snake.ctx.lineTo(Snake.canvas.width, i * Snake.gridSize);
        Snake.ctx.stroke();
    }
    
    // Draw snake
    Snake.snake.forEach((segment, index) => {
        Snake.ctx.fillStyle = index === 0 ? '#FFD700' : (Snake.currentPlayerTurn === 1 ? '#2196F3' : '#F44336');
        Snake.ctx.fillRect(
            segment.x * Snake.gridSize + 1,
            segment.y * Snake.gridSize + 1,
            Snake.gridSize - 2,
            Snake.gridSize - 2
        );
    });
    
    // Draw food
    Snake.ctx.fillStyle = '#4CAF50';
    Snake.ctx.beginPath();
    Snake.ctx.arc(
        Snake.food.x * Snake.gridSize + Snake.gridSize / 2,
        Snake.food.y * Snake.gridSize + Snake.gridSize / 2,
        Snake.gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    Snake.ctx.fill();
}

function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * Snake.tileCount),
            y: Math.floor(Math.random() * Snake.tileCount)
        };
    } while (Snake.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    Snake.food = newFood;
}

function handleSnakeKeyPress(event) {
    if (!Snake.gameActive || Snake.isPaused) return;
    
    const key = event.key;
    
    // Prevent default arrow key behavior (scrolling)
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        event.preventDefault();
    }
    
    // Change direction (prevent 180-degree turns)
    if (key === 'ArrowUp' && Snake.dy === 0) {
        Snake.dx = 0;
        Snake.dy = -1;
    } else if (key === 'ArrowDown' && Snake.dy === 0) {
        Snake.dx = 0;
        Snake.dy = 1;
    } else if (key === 'ArrowLeft' && Snake.dx === 0) {
        Snake.dx = -1;
        Snake.dy = 0;
    } else if (key === 'ArrowRight' && Snake.dx === 0) {
        Snake.dx = 1;
        Snake.dy = 0;
    }
}

function updateSnakeTimer() {
    if (!Snake.gameActive || Snake.isPaused) return;
    
    Snake.timeLeft--;
    
    if (Snake.timeLeft <= 0) {
        endSnakeGame('Time\'s up!');
    } else {
        updateSnakeStatus();
    }
}

function endSnakeGame(reason) {
    Snake.gameActive = false;
    clearInterval(Snake.gameLoop);
    clearInterval(Snake.timerInterval);
    
    // Award points
    updateScore(Snake.currentPlayerTurn, 'snake', Snake.score);
    
    // Update UI
    document.getElementById('startSnake').disabled = false;
    document.getElementById('pauseSnake').disabled = true;
    
    const playerName = GameState.players[`player${Snake.currentPlayerTurn}`].name;
    updateSnakeStatus(`${reason} ${playerName} scored ${Snake.score} points!`);
    logActivity(`${playerName} finished Snake game with ${Snake.score} points`);
    
    // Switch to next player
    switchPlayer();
}

function togglePauseSnake() {
    if (!Snake.gameActive) return;
    
    Snake.isPaused = !Snake.isPaused;
    document.getElementById('pauseSnake').textContent = Snake.isPaused ? 'Resume' : 'Pause';
    
    if (Snake.isPaused) {
        updateSnakeStatus('Game Paused');
    } else {
        updateSnakeStatus();
    }
}

function updateSnakeStatus(message = null) {
    const playerTurnElement = document.getElementById('snakePlayerTurn');
    const timerElement = document.getElementById('snakeTimer');
    const scoreElement = document.getElementById('snakeScore');
    
    if (message) {
        playerTurnElement.textContent = message;
        playerTurnElement.style.color = 'var(--accent-gold)';
    } else if (Snake.gameActive) {
        const playerName = GameState.players[`player${Snake.currentPlayerTurn}`].name;
        playerTurnElement.textContent = `${playerName}'s Turn`;
        playerTurnElement.style.color = Snake.currentPlayerTurn === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
    } else {
        playerTurnElement.textContent = 'Press Start to Play';
        playerTurnElement.style.color = 'var(--text-gray)';
    }
    
    timerElement.textContent = `Time: ${Snake.timeLeft}s`;
    timerElement.style.color = Snake.timeLeft <= 10 ? 'var(--error)' : 'var(--text-light)';
    
    scoreElement.textContent = `Score: ${Snake.score}`;
}

function resetSnake() {
    // Stop any active game
    Snake.gameActive = false;
    Snake.isPaused = false;
    clearInterval(Snake.gameLoop);
    clearInterval(Snake.timerInterval);
    
    // Reset state
    Snake.snake = [];
    Snake.dx = 0;
    Snake.dy = 0;
    Snake.score = 0;
    Snake.timeLeft = 60;
    Snake.speed = 100;
    
    // Clear canvas
    Snake.ctx.fillStyle = '#0f3460';
    Snake.ctx.fillRect(0, 0, Snake.canvas.width, Snake.canvas.height);
    
    // Update UI
    document.getElementById('startSnake').disabled = false;
    document.getElementById('pauseSnake').disabled = true;
    document.getElementById('pauseSnake').textContent = 'Pause';
    
    updateSnakeStatus();
    logActivity('Snake game has been reset');
}

// Export for use in main.js
window.initSnake = initSnake;
window.resetSnake = resetSnake;

// Made with Bob
