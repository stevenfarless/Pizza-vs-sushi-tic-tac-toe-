const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const result = document.querySelector('#result');
const resetButton = document.querySelector('#reset');

let currentPlayer = '🍕';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(event) {
  // Get the index of the clicked cell within the cells array
  const cellIndex = Array.from(cells).indexOf(event.target);

  if (gameActive && gameBoard[cellIndex] === '') {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      result.textContent = `${winner} wins!`;
      // End the game
      gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
      // If all cells are filled and there's no winner, it's a draw
      result.textContent = "🍕 It's a draw! 🍣";
      // End the game
      gameActive = false;
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === '🍕' ? '🍣' : '🍕';
      // Update the result display to show the current player's turn
      result.textContent = `${currentPlayer}'s turn`;
    }
  }
}

// Check for a win
function checkWinner() {
  // Define the winning conditions (rows, columns, diagonals)
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]           // Diagonals
  ];

  // Iterate over each winning condition
  for (let i = 0; i < winConditions.length; i++) {
    // Extract indices of the cells in the current condition
    const [a, b, c] = winConditions[i];
    // Check if all three cells have the same symbol and it's not empty
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      // Return the winning symbol
      return gameBoard[a];
    }
  }
  // If no winning condition is met, return null (no winner)
  return null;
}

function resetGame() {
  // Set the game back to its initial state
  currentPlayer = '🍕';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  // Reset the result display
  result.textContent = '🍕\'s turn';
  // Clear the content of each cell
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
resetButton.addEventListener('click', resetGame);

// Set the initial game state (start with X's turn)
result.textContent = '🍕\'s turn';