// Variable to keep track of the current player
let currentPlayer = 'X';
// Variable to determine if it's the player's turn or the AI's turn
let isPlayerTurn = true;

// Function to handle a player's move
function makeMove(cellId) {
  const cell = document.getElementById(`cell-${cellId}`);
  if (cell.innerHTML === '' && isPlayerTurn) {
    cell.innerHTML = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    isPlayerTurn = false;
    if (!checkWinner()) {
      setTimeout(makeAiMove, 500); // Delay AI move for half a second
    }
  }
}

// Function to make the AI's move
function makeAiMove() {
  const availableCells = getAvailableCells();
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const randomCellId = availableCells[randomIndex];
  const cell = document.getElementById(`cell-${randomCellId}`);
  cell.innerHTML = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  isPlayerTurn = true;
}

// Function to check if there is a winner
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    const cellA = document.getElementById(`cell-${a}`).innerHTML;
    const cellB = document.getElementById(`cell-${b}`).innerHTML;
    const cellC = document.getElementById(`cell-${c}`).innerHTML;

    if (cellA !== '' && cellA === cellB && cellB === cellC) {
      if (cellA === 'X') {
        alert('You win!');
      } else {
        alert('AI wins!');
      }
      resetGame();
      return true;
    }
  }

  // Check if all cells are filled (tie)
  const cells = document.getElementsByTagName('td');
  let isTie = true;
  for (let cell of cells) {
    if (cell.innerHTML === '') {
      isTie = false;
      break;
    }
  }
  if (isTie) {
    alert("It's a tie!");
    resetGame();
    return true;
  }

  return false;
}

// Function to get the available cells
function getAvailableCells() {
  const cells = document.getElementsByTagName('td');
  const availableCells = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === '') {
      availableCells.push(i);
    }
  }
  return availableCells;
}

// Function to reset the game
function resetGame() {
  const cells = document.getElementsByTagName('td');
  for (let cell of cells) {
    cell.innerHTML = '';
  }
  currentPlayer = 'X';
  isPlayerTurn = true;
}

// Function to handle a player's move
function makeMove(cellId) {
  const cell = document.getElementById(`cell-${cellId}`);
  if (cell.innerHTML === '' && isPlayerTurn) {
    cell.innerHTML = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    isPlayerTurn = false;
    if (!checkWinner()) {
      setTimeout(makeAiMove, 500); // Delay AI move for half a second
    }
  }
}

// Function to make the AI's move
function makeAiMove() {
  const availableCells = getAvailableCells();
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const randomCellId = availableCells[randomIndex];
  const cell = document.getElementById(`cell-${randomCellId}`);
  cell.innerHTML = currentPlayer;
  cell.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  isPlayerTurn = true;
}

// Function to reset the game
function resetGame() {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('player-x', 'player-o'); // Remove player classes to remove background colors
  });
  currentPlayer = 'X';
  isPlayerTurn = true;
  showMessage('');
}

// Call resetGame initially to start a new game
resetGame();
