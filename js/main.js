// ===== Global Game State Management =====
const GameState = {
    currentPlayer: 1,
    players: {
        player1: {
            name: "Player 1",
            totalScore: 0,
            ticTacToeScore: 0,
            snakeScore: 0,
            queensScore: 0
        },
        player2: {
            name: "Player 2",
            totalScore: 0,
            ticTacToeScore: 0,
            snakeScore: 0,
            queensScore: 0
        }
    },
    activeGame: null
};

// ===== Utility Functions =====
function switchPlayer() {
    GameState.currentPlayer = GameState.currentPlayer === 1 ? 2 : 1;
    updateCurrentPlayerDisplay();
    logActivity(`Switched to ${GameState.players[`player${GameState.currentPlayer}`].name}'s turn`);
}

function updateCurrentPlayerDisplay() {
    const display = document.getElementById('currentPlayerDisplay');
    const playerName = GameState.players[`player${GameState.currentPlayer}`].name;
    display.textContent = `${playerName}'s Turn`;
    display.style.color = GameState.currentPlayer === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
}

function updateScore(player, game, points) {
    const playerKey = `player${player}`;
    const gameKey = `${game}Score`;
    
    GameState.players[playerKey][gameKey] += points;
    GameState.players[playerKey].totalScore += points;
    
    // Update scoreboard display
    updateScoreboardDisplay();
    
    logActivity(`${GameState.players[playerKey].name} scored ${points} points in ${game}!`);
}

function updateScoreboardDisplay() {
    // Update Player 1 scores
    document.getElementById('player1Total').textContent = GameState.players.player1.totalScore;
    document.getElementById('player1TicTacToe').textContent = GameState.players.player1.ticTacToeScore;
    document.getElementById('player1Snake').textContent = GameState.players.player1.snakeScore;
    document.getElementById('player1Queens').textContent = GameState.players.player1.queensScore;
    
    // Update Player 2 scores
    document.getElementById('player2Total').textContent = GameState.players.player2.totalScore;
    document.getElementById('player2TicTacToe').textContent = GameState.players.player2.ticTacToeScore;
    document.getElementById('player2Snake').textContent = GameState.players.player2.snakeScore;
    document.getElementById('player2Queens').textContent = GameState.players.player2.queensScore;
}

function logActivity(message) {
    const activityLog = document.getElementById('activityLog');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('p');
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    // Add to top of log
    activityLog.insertBefore(logEntry, activityLog.firstChild);
    
    // Keep only last 10 entries
    while (activityLog.children.length > 10) {
        activityLog.removeChild(activityLog.lastChild);
    }
}

function resetAllScores() {
    if (confirm('Are you sure you want to reset all scores?')) {
        GameState.players.player1.totalScore = 0;
        GameState.players.player1.ticTacToeScore = 0;
        GameState.players.player1.snakeScore = 0;
        GameState.players.player1.queensScore = 0;
        
        GameState.players.player2.totalScore = 0;
        GameState.players.player2.ticTacToeScore = 0;
        GameState.players.player2.snakeScore = 0;
        GameState.players.player2.queensScore = 0;
        
        updateScoreboardDisplay();
        logActivity('All scores have been reset!');
        
        // Reset all games
        if (typeof resetTicTacToe === 'function') resetTicTacToe();
        if (typeof resetSnake === 'function') resetSnake();
        if (typeof resetQueens === 'function') resetQueens();
    }
}

// ===== Player Name Setup =====
function setupPlayerNames() {
    // Prompt for player names
    let player1Name = prompt('Enter Player 1 name:', 'Player 1');
    let player2Name = prompt('Enter Player 2 name:', 'Player 2');
    
    // Validate and set names
    if (player1Name && player1Name.trim() !== '') {
        GameState.players.player1.name = player1Name.trim();
    }
    if (player2Name && player2Name.trim() !== '') {
        GameState.players.player2.name = player2Name.trim();
    }
    
    // Update scoreboard headers
    updatePlayerNamesDisplay();
    
    logActivity(`${GameState.players.player1.name} vs ${GameState.players.player2.name} - Let the games begin!`);
}

function updatePlayerNamesDisplay() {
    // Update scoreboard player names
    const player1Header = document.querySelector('.player1-score h3');
    const player2Header = document.querySelector('.player2-score h3');
    
    if (player1Header) player1Header.textContent = GameState.players.player1.name;
    if (player2Header) player2Header.textContent = GameState.players.player2.name;
}

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 BOB\'s ARENA Initialized!');
    
    // Setup player names first
    setupPlayerNames();
    
    // Initialize current player display
    updateCurrentPlayerDisplay();
    
    // Initialize scoreboard
    updateScoreboardDisplay();
    
    // Setup reset all scores button
    const resetAllBtn = document.getElementById('resetAllScores');
    if (resetAllBtn) {
        resetAllBtn.addEventListener('click', resetAllScores);
    }
    
    // Log initial message
    logActivity('Welcome to BOB\'s ARENA!');
    logActivity(`${GameState.players.player1.name} starts first. Good luck!`);
    
    // Initialize all games (these functions are defined in their respective files)
    if (typeof initTicTacToe === 'function') {
        initTicTacToe();
        console.log('✓ Tic Tac Toe initialized');
    }
    
    if (typeof initSnake === 'function') {
        initSnake();
        console.log('✓ Snake Game initialized');
    }
    
    if (typeof initQueens === 'function') {
        initQueens();
        console.log('✓ 8 Queens Puzzle initialized');
    }
    
    console.log('🎉 All games ready to play!');
});

// ===== Export for use in other modules =====
window.GameState = GameState;
window.switchPlayer = switchPlayer;
window.updateScore = updateScore;
window.logActivity = logActivity;

// Made with Bob
