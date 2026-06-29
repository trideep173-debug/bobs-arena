// ===== Tic Tac Toe Game Logic =====
const TicTacToe = {
    board: Array(9).fill(null),
    gameActive: true,
    currentSymbol: 'X',
    
    winningCombinations: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ]
};

function initTicTacToe() {
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('resetTicTacToe');
    
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetBtn.addEventListener('click', resetTicTacToe);
    
    updateTicTacToeStatus();
}

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));
    
    // Check if cell is already taken or game is not active
    if (TicTacToe.board[index] !== null || !TicTacToe.gameActive) {
        return;
    }
    
    // Place the mark
    TicTacToe.board[index] = TicTacToe.currentSymbol;
    cell.textContent = TicTacToe.currentSymbol;
    cell.classList.add('taken');
    cell.classList.add(GameState.currentPlayer === 1 ? 'player1' : 'player2');
    
    // Check for win or draw
    if (checkWin()) {
        handleWin();
    } else if (checkDraw()) {
        handleDraw();
    } else {
        // Switch player and symbol
        switchPlayer();
        TicTacToe.currentSymbol = TicTacToe.currentSymbol === 'X' ? 'O' : 'X';
        updateTicTacToeStatus();
    }
}

function checkWin() {
    return TicTacToe.winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (TicTacToe.board[a] && 
            TicTacToe.board[a] === TicTacToe.board[b] && 
            TicTacToe.board[a] === TicTacToe.board[c]) {
            highlightWinningCells(combination);
            return true;
        }
        return false;
    });
}

function checkDraw() {
    return TicTacToe.board.every(cell => cell !== null);
}

function highlightWinningCells(combination) {
    const cells = document.querySelectorAll('.cell');
    combination.forEach(index => {
        cells[index].classList.add('winning');
    });
}

function handleWin() {
    TicTacToe.gameActive = false;
    const winner = GameState.currentPlayer;
    const winnerName = GameState.players[`player${winner}`].name;
    
    updateScore(winner, 'ticTacToe', 10);
    updateTicTacToeStatus(`🎉 ${winnerName} wins! +10 points`);
    logActivity(`${winnerName} won Tic Tac Toe!`);
    
    // Don't auto-switch player on win - let them start next game
}

function handleDraw() {
    TicTacToe.gameActive = false;
    
    // Both players get 5 points for a draw
    updateScore(1, 'ticTacToe', 5);
    updateScore(2, 'ticTacToe', 5);
    
    updateTicTacToeStatus('🤝 Draw! Both players get +5 points');
    logActivity('Tic Tac Toe ended in a draw!');
}

function updateTicTacToeStatus(message = null) {
    const statusElement = document.getElementById('ticTacToeStatus');
    
    if (message) {
        statusElement.textContent = message;
    } else if (TicTacToe.gameActive) {
        const playerName = GameState.players[`player${GameState.currentPlayer}`].name;
        statusElement.textContent = `${playerName} (${TicTacToe.currentSymbol}) - Your Turn`;
        statusElement.style.color = GameState.currentPlayer === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
    }
}

function resetTicTacToe() {
    // Reset game state
    TicTacToe.board = Array(9).fill(null);
    TicTacToe.gameActive = true;
    TicTacToe.currentSymbol = 'X';
    
    // Reset UI
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'player1', 'player2', 'winning');
    });
    
    // Reset to player 1
    GameState.currentPlayer = 1;
    updateCurrentPlayerDisplay();
    updateTicTacToeStatus();
    
    logActivity('Tic Tac Toe has been reset');
}

// Export for use in main.js
window.initTicTacToe = initTicTacToe;
window.resetTicTacToe = resetTicTacToe;

// Made with Bob
