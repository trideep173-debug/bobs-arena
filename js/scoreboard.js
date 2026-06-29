// ===== Scoreboard Additional Features =====

// This file contains additional scoreboard functionality
// Core scoreboard logic is in main.js

// Add visual effects when scores update
function animateScoreUpdate(playerId, gameType) {
    const elementId = `player${playerId}${gameType.charAt(0).toUpperCase() + gameType.slice(1)}`;
    const element = document.getElementById(elementId);
    
    if (element) {
        element.classList.add('score-pulse');
        setTimeout(() => element.classList.remove('score-pulse'), 500);
    }
}

// Add CSS for score pulse animation dynamically
const style = document.createElement('style');
style.textContent = `
    .score-pulse {
        animation: scorePulse 0.5s ease;
    }
    
    @keyframes scorePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); color: var(--accent-gold); }
    }
`;
document.head.appendChild(style);

// Enhanced activity logging with color coding
function logActivityEnhanced(message, type = 'info') {
    const activityLog = document.getElementById('activityLog');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('p');
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    // Add color based on type
    switch(type) {
        case 'win':
            logEntry.style.borderLeftColor = 'var(--success)';
            break;
        case 'score':
            logEntry.style.borderLeftColor = 'var(--accent-gold)';
            break;
        case 'error':
            logEntry.style.borderLeftColor = 'var(--error)';
            break;
        default:
            logEntry.style.borderLeftColor = 'var(--border-color)';
    }
    
    activityLog.insertBefore(logEntry, activityLog.firstChild);
    
    // Keep only last 10 entries
    while (activityLog.children.length > 10) {
        activityLog.removeChild(activityLog.lastChild);
    }
}

// Get game statistics
function getGameStatistics() {
    return {
        player1: {
            totalScore: GameState.players.player1.totalScore,
            gamesWon: calculateGamesWon(1),
            favoriteGame: getFavoriteGame(1)
        },
        player2: {
            totalScore: GameState.players.player2.totalScore,
            gamesWon: calculateGamesWon(2),
            favoriteGame: getFavoriteGame(2)
        }
    };
}

function calculateGamesWon(player) {
    let wins = 0;
    const playerKey = `player${player}`;
    
    // Count wins based on score thresholds
    if (GameState.players[playerKey].ticTacToeScore >= 10) wins++;
    if (GameState.players[playerKey].snakeScore > 0) wins++;
    if (GameState.players[playerKey].queensScore >= 20) wins++;
    
    return wins;
}

function getFavoriteGame(player) {
    const playerKey = `player${player}`;
    const scores = {
        'Tic Tac Toe': GameState.players[playerKey].ticTacToeScore,
        'Snake': GameState.players[playerKey].snakeScore,
        'Queens': GameState.players[playerKey].queensScore
    };
    
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
}

// Display winner at the end
function displayOverallWinner() {
    const p1Total = GameState.players.player1.totalScore;
    const p2Total = GameState.players.player2.totalScore;
    
    if (p1Total > p2Total) {
        return `🏆 ${GameState.players.player1.name} is leading with ${p1Total} points!`;
    } else if (p2Total > p1Total) {
        return `🏆 ${GameState.players.player2.name} is leading with ${p2Total} points!`;
    } else {
        return `🤝 It's a tie! Both players have ${p1Total} points!`;
    }
}

// Update scoreboard with enhanced features
function updateScoreboardEnhanced() {
    updateScoreboardDisplay();
    
    // Add winner indicator if there's a significant lead
    const p1Total = GameState.players.player1.totalScore;
    const p2Total = GameState.players.player2.totalScore;
    const difference = Math.abs(p1Total - p2Total);
    
    if (difference >= 20) {
        const leader = p1Total > p2Total ? 'player1' : 'player2';
        const leaderElement = document.querySelector(`.${leader}-score`);
        leaderElement.style.boxShadow = '0 0 20px var(--accent-gold)';
    }
}

// Export functions
window.animateScoreUpdate = animateScoreUpdate;
window.logActivityEnhanced = logActivityEnhanced;
window.getGameStatistics = getGameStatistics;
window.displayOverallWinner = displayOverallWinner;
window.updateScoreboardEnhanced = updateScoreboardEnhanced;

console.log('✓ Scoreboard enhancements loaded');

// Made with Bob
