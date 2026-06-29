// ===== 8 Queens Puzzle Logic =====
const Queens = {
    board: Array(8).fill(null).map(() => Array(8).fill(null)),
    player1Queens: 0,
    player2Queens: 0,
    gameActive: true,
    totalQueensPlaced: 0
};

function initQueens() {
    createQueensBoard();
    
    const resetBtn = document.getElementById('resetQueens');
    resetBtn.addEventListener('click', resetQueens);
    
    updateQueensStatus();
}

function createQueensBoard() {
    const board = document.getElementById('queensBoard');
    board.innerHTML = '';
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.className = 'queens-cell';
            cell.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleQueenPlacement);
            board.appendChild(cell);
        }
    }
}

function handleQueenPlacement(event) {
    if (!Queens.gameActive) return;
    
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    
    // Check if cell already has a queen
    if (Queens.board[row][col] !== null) {
        logActivity('Cell already occupied!');
        return;
    }
    
    // Check if placement is valid
    if (!isValidQueenPlacement(row, col)) {
        // Invalid placement - show feedback and lose 1 point
        cell.classList.add('invalid-placement');
        setTimeout(() => cell.classList.remove('invalid-placement'), 500);
        
        updateScore(GameState.currentPlayer, 'queens', -1);
        logActivity(`${GameState.players[`player${GameState.currentPlayer}`].name} made an invalid queen placement (-1 point)`);
        
        // Switch player on invalid move
        switchPlayer();
        updateQueensStatus();
        return;
    }
    
    // Valid placement - place the queen
    Queens.board[row][col] = GameState.currentPlayer;
    Queens.totalQueensPlaced++;
    
    if (GameState.currentPlayer === 1) {
        Queens.player1Queens++;
        cell.classList.add('has-queen', 'player1-queen');
    } else {
        Queens.player2Queens++;
        cell.classList.add('has-queen', 'player2-queen');
    }
    
    cell.textContent = '♛';
    
    // Award points for valid placement
    updateScore(GameState.currentPlayer, 'queens', 2);
    
    // Update attack indicators
    updateAttackIndicators();
    
    // Check if current player has won (placed 8 queens)
    if (Queens.player1Queens === 8) {
        handleQueensWin(1);
        return;
    } else if (Queens.player2Queens === 8) {
        handleQueensWin(2);
        return;
    }
    
    // Check if board is full (draw condition)
    if (Queens.totalQueensPlaced === 64) {
        handleQueensDraw();
        return;
    }
    
    // Switch to next player
    switchPlayer();
    updateQueensStatus();
}

function isValidQueenPlacement(row, col) {
    // Check row
    for (let c = 0; c < 8; c++) {
        if (Queens.board[row][c] !== null) return false;
    }
    
    // Check column
    for (let r = 0; r < 8; r++) {
        if (Queens.board[r][col] !== null) return false;
    }
    
    // Check diagonal (top-left to bottom-right)
    for (let i = -7; i <= 7; i++) {
        const r = row + i;
        const c = col + i;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            if (Queens.board[r][c] !== null) return false;
        }
    }
    
    // Check diagonal (top-right to bottom-left)
    for (let i = -7; i <= 7; i++) {
        const r = row + i;
        const c = col - i;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            if (Queens.board[r][c] !== null) return false;
        }
    }
    
    return true;
}

function updateAttackIndicators() {
    // Clear all attack indicators
    const cells = document.querySelectorAll('.queens-cell');
    cells.forEach(cell => cell.classList.remove('under-attack'));
    
    // Mark cells under attack
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (Queens.board[row][col] !== null) {
                markAttackedCells(row, col);
            }
        }
    }
}

function markAttackedCells(queenRow, queenCol) {
    const cells = document.querySelectorAll('.queens-cell');
    
    // Mark row
    for (let c = 0; c < 8; c++) {
        if (c !== queenCol) {
            const index = queenRow * 8 + c;
            cells[index].classList.add('under-attack');
        }
    }
    
    // Mark column
    for (let r = 0; r < 8; r++) {
        if (r !== queenRow) {
            const index = r * 8 + queenCol;
            cells[index].classList.add('under-attack');
        }
    }
    
    // Mark diagonals
    for (let i = -7; i <= 7; i++) {
        if (i === 0) continue;
        
        // Top-left to bottom-right
        const r1 = queenRow + i;
        const c1 = queenCol + i;
        if (r1 >= 0 && r1 < 8 && c1 >= 0 && c1 < 8) {
            const index = r1 * 8 + c1;
            cells[index].classList.add('under-attack');
        }
        
        // Top-right to bottom-left
        const r2 = queenRow + i;
        const c2 = queenCol - i;
        if (r2 >= 0 && r2 < 8 && c2 >= 0 && c2 < 8) {
            const index = r2 * 8 + c2;
            cells[index].classList.add('under-attack');
        }
    }
}

function handleQueensWin(player) {
    Queens.gameActive = false;
    const winnerName = GameState.players[`player${player}`].name;
    
    // Award bonus points for completing the puzzle
    updateScore(player, 'queens', 20);
    
    updateQueensStatus(`🎉 ${winnerName} wins! Placed 8 queens successfully! +20 bonus points`);
    logActivity(`${winnerName} won the 8 Queens puzzle!`);
}

function handleQueensDraw() {
    Queens.gameActive = false;
    updateQueensStatus('Board full! No winner this round.');
    logActivity('8 Queens puzzle ended with no winner');
}

function updateQueensStatus(message = null) {
    const playerTurnElement = document.getElementById('queensPlayerTurn');
    const queensCountElement = document.getElementById('queensCount');
    
    if (message) {
        playerTurnElement.textContent = message;
        playerTurnElement.style.color = 'var(--accent-gold)';
    } else if (Queens.gameActive) {
        const playerName = GameState.players[`player${GameState.currentPlayer}`].name;
        playerTurnElement.textContent = `${playerName}'s Turn`;
        playerTurnElement.style.color = GameState.currentPlayer === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
    } else {
        playerTurnElement.textContent = 'Game Over';
        playerTurnElement.style.color = 'var(--text-gray)';
    }
    
    queensCountElement.textContent = `Queens: P1: ${Queens.player1Queens} | P2: ${Queens.player2Queens}`;
}

function resetQueens() {
    // Reset game state
    Queens.board = Array(8).fill(null).map(() => Array(8).fill(null));
    Queens.player1Queens = 0;
    Queens.player2Queens = 0;
    Queens.gameActive = true;
    Queens.totalQueensPlaced = 0;
    
    // Recreate board
    createQueensBoard();
    
    // Reset to player 1
    GameState.currentPlayer = 1;
    updateCurrentPlayerDisplay();
    updateQueensStatus();
    
    logActivity('8 Queens puzzle has been reset');
}

// Export for use in main.js
window.initQueens = initQueens;
window.resetQueens = resetQueens;

// Made with Bob
