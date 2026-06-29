# 🎮 BOB's ARENA

A web-based gaming platform featuring four classic games in a 2x2 grid layout for two players on the same device.

## 🎯 Games Included

### 1. ❌⭕ Tic Tac Toe
Classic turn-based strategy game where players alternate placing X and O marks.

**How to Play:**
- Click on any empty cell to place your mark
- Player 1 uses X, Player 2 uses O
- Get 3 in a row (horizontal, vertical, or diagonal) to win

**Scoring:**
- Win: +10 points
- Draw: +5 points each
- Loss: 0 points

### 2. 🐍 Snake Game
Time-limited rounds where players control a snake to eat food and grow.

**How to Play:**
- Click "Start Game" to begin your turn
- Use Arrow Keys (↑ ↓ ← →) to control the snake
- Eat green food to grow and score points
- Avoid hitting walls or yourself
- Each player gets 60 seconds per turn

**Scoring:**
- Each food eaten: +10 points
- Game ends when time runs out or snake dies
- Higher score wins!

**Controls:**
- ↑ Arrow Up: Move up
- ↓ Arrow Down: Move down
- ← Arrow Left: Move left
- → Arrow Right: Move right
- Pause button: Pause/Resume game

### 3. ♛ 8 Queens Puzzle
Competitive puzzle where players take turns placing queens on a chessboard.

**How to Play:**
- Click on any empty cell to place a queen
- Queens cannot attack each other (same row, column, or diagonal)
- Red highlighted cells show invalid placements
- Orange cells show areas under attack
- First player to successfully place 8 queens wins

**Scoring:**
- Valid queen placement: +2 points
- Invalid placement: -1 point (and lose turn)
- Complete puzzle (8 queens): +20 bonus points

**Strategy Tips:**
- Plan ahead - each queen blocks a row, column, and diagonals
- Watch the attack indicators (orange cells)
- Try to place queens in positions that give you more options

### 4. 🏆 Scoreboard
Real-time score tracking and game statistics.

**Features:**
- Total scores for both players
- Individual game score breakdown
- Recent activity log
- Current player indicator
- Reset all scores button

## 🚀 Getting Started

### Installation
1. Download all files to a folder
2. Open `index.html` in a modern web browser
3. No installation or dependencies required!

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Minimum screen resolution: 768px width recommended

## 🎮 How to Play

### Starting a Game Session
1. Open the page - Player 1 starts first
2. Choose any game to play
3. Follow the game-specific instructions
4. Scores update automatically in the scoreboard

### Turn-Based Gameplay
- Most games use turn-based mechanics
- Current player is shown at the top of the page
- Each game shows whose turn it is
- Players alternate after each move or game completion

### Winning the Session
- Play multiple rounds of different games
- Accumulate points across all games
- Player with the highest total score wins!
- Use "Reset All" to start a fresh session

## 📱 Responsive Design

The game adapts to different screen sizes:
- **Desktop (1024px+)**: Full 2x2 grid layout
- **Tablet (768px-1023px)**: Optimized 2x2 grid
- **Mobile (<768px)**: Stacked vertical layout

## 🎨 Features

### Visual Feedback
- Color-coded players (Blue for P1, Red for P2)
- Smooth animations and transitions
- Winning celebrations
- Score update effects
- Attack indicators in Queens puzzle

### Game Controls
- Click/tap to interact
- Keyboard controls for Snake game
- Reset buttons for each game
- Pause/Resume for Snake game
- Global reset for all scores

### Activity Log
- Tracks recent game events
- Shows timestamps
- Displays score changes
- Records wins and achievements

## 🏆 Scoring System

### Total Score Calculation
Your total score is the sum of points from all three games:
```
Total Score = Tic Tac Toe Score + Snake Score + Queens Score
```

### Score Breakdown
- **Tic Tac Toe**: 0-100+ points (multiple rounds)
- **Snake**: 0-500+ points (based on food eaten)
- **Queens**: 0-100+ points (valid placements + bonuses)

### Winning Strategies
1. **Tic Tac Toe**: Focus on blocking opponent and creating forks
2. **Snake**: Maximize time, eat efficiently, avoid risky moves
3. **Queens**: Plan placements carefully, avoid invalid moves

## 🛠️ Technical Details

### Technologies Used
- HTML5 (Structure & Canvas API)
- CSS3 (Grid Layout, Animations)
- Vanilla JavaScript (Game Logic)
- No external dependencies

### File Structure
```
multiplayer-games/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── js/
│   ├── main.js         # Global state management
│   ├── tic-tac-toe.js  # Tic Tac Toe logic
│   ├── snake.js        # Snake game logic
│   ├── queens.js       # 8 Queens puzzle logic
│   └── scoreboard.js   # Scoreboard features
└── README.md           # This file
```

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎯 Game Tips & Tricks

### Tic Tac Toe
- Control the center square
- Create multiple winning threats
- Block opponent's winning moves
- Think two moves ahead

### Snake
- Use the edges strategically
- Don't trap yourself
- Plan your path before moving
- Speed increases as you grow - be careful!

### 8 Queens Puzzle
- Start from corners or edges
- Visualize attack patterns
- Don't rush - invalid moves cost points
- Remember: each queen eliminates many squares

## 🐛 Troubleshooting

### Game Not Loading
- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page
- Clear browser cache

### Controls Not Working
- Click on the game area to focus
- Ensure no other keys are pressed
- For Snake: make sure game is started

### Display Issues
- Zoom level should be 100%
- Try full-screen mode (F11)
- Check minimum screen resolution

## 🔄 Future Enhancements

Planned features for future versions:
- Online multiplayer with WebSocket
- AI opponents
- More games (Connect Four, Checkers)
- Sound effects and music
- Game replay system
- Leaderboards and statistics
- Custom player names and avatars
- Difficulty levels

## 📄 License

This project is open source and available for personal and educational use.

## 👥 Credits

Developed as a fun multiplayer gaming experience for friends and family.

## 🎉 Have Fun!

Enjoy playing with your friends! May the best player win! 🏆

---

**Version:** 1.0.0  
**Last Updated:** 2026  
**Status:** Fully Functional ✅