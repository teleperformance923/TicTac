// Factory function for creating a Tic Tac Toe game
function createGame() {
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameOver = false;

    // Win conditions for the game
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Check if there's a winner
    function checkWinner() {
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // 'X' or 'O'
            }
        }
        return null;
    }

    // Check if the board is full (no more moves available)
    function isBoardFull() {
        return board.every(cell => cell !== null);
    }

    // Function to handle player moves
    function makeMove(index) {
        if (board[index] || gameOver) return; // Ignore if cell is already taken or game is over
        board[index] = currentPlayer;
        document.querySelector(`.cell[data-index="${index}"]`).textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            document.getElementById('message').textContent = `${winner} wins!`;
        } else if (isBoardFull()) {
            gameOver = true;
            document.getElementById('message').textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
            document.getElementById('message').textContent = `${currentPlayer}'s turn`;
        }
    }

    // Reset the game
    function resetGame() {
        board.fill(null);
        gameOver = false;
        currentPlayer = 'X';
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
        document.getElementById('message').textContent = "X's turn";
    }

    return {
        makeMove,
        resetGame
    };
}

// Initialize the game
const game = createGame();

// Event listener for the cells
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.getAttribute('data-index'));
        game.makeMove(index);
    });
});

// Event listener for the reset button
document.getElementById('reset').addEventListener('click', () => {
    game.resetGame();
    document.getElementById('message').textContent = "X's turn";
});
