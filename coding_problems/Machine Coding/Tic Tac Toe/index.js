// TicTacToe Class: Encapsulates the game logic and DOM manipulation
class TicTacToe {
  // Winning combinations that determine the victory state
  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  // Game state initialization
  winningState = Array(9).fill(null); // Keeps track of the board's state
  isPlayer1 = true; // Indicates the current player
  player1 = "X"; // Symbol for Player 1
  player2 = "O"; // Symbol for Player 2
  currentPlayer = this.player1; // Current player's symbol
  msg = ""; // Message displayed to players
  gameOver = false;

  /**
   * Resets the game state and updates the UI
   */
  onReset() {
    this.winningState = Array(9).fill(null); // Reset game state
    this.isPlayer1 = true; // Reset to Player 1
    this.currentPlayer = this.player1; // Reset current player
    // Clear all boxes and remove the selected class
    [...document.getElementsByClassName("box")].forEach((box) => {
      box.innerHTML = "";
      box.classList.remove("selected");
      box.classList.remove("winner");
    });
    // Reset the message display
    document.getElementById("message").innerHTML = "Player X's turn.";
    this.gameOver = false;
  }

  /**
   * Initializes event listeners for game interaction
   */
  init() {
    // Add click listener to the container for box selection
    document
      .getElementById("container")
      .addEventListener("click", (e) => this.handleClick(e));
    // Add click listener to the reset button
    document
      .getElementById("reset")
      .addEventListener("click", () => this.onReset());
  }

  /**
   * Handles the click event for a box
   * @param {Event} e - The click event
   */
  handleClick(e) {
    const selectedBox = e.target.dataset.item; // Get the box number
    if (!selectedBox || this.winningState[selectedBox] || this.gameOver) return; // Ignore invalid clicks
    this.selectBoxForPlayer(selectedBox, e.target);
  }

  /**
   * Updates the game state and checks for the winner or draw
   * @param {number} boxNumber - The clicked box's index
   * @param {HTMLElement} boxElement - The clicked box element
   */
  selectBoxForPlayer(boxNumber, boxElement) {
    // Update the UI and game state
    boxElement.innerHTML = this.currentPlayer;
    boxElement.classList.add("selected");
    this.winningState[boxNumber] = this.currentPlayer;

    // Check if there's a winner or the game is a draw
    const result = this.calculateWinner();
    if (result) {
      this.highlightWinningCombination(result); // Highlight winning combination
      this.msg = `Player ${this.currentPlayer} won!`; // Update message
      this.gameOver = true;
    } else if (this.winningState.every((cell) => cell !== null)) {
      this.msg = `Match draw!`; // Game is a draw
      this.gameOver = true;
    } else {
      this.switchPlayer(); // Switch to the next player
    }

    // Update the message on the UI
    document.getElementById("message").innerHTML = this.msg;
  }

  /**
   * Checks if the current player has a winning combination
   * @returns {Array|null} - Winning combination if found, otherwise null
   */
  calculateWinner() {
    return this.winningCombinations.find((combo) =>
      combo.every((index) => this.winningState[index] === this.currentPlayer)
    );
  }

  /**
   * Highlights the boxes that form the winning combination
   * @param {Array} winningCombo - The winning combination
   */
  highlightWinningCombination(winningCombo) {
    winningCombo.forEach((index) => {
      const box = document.querySelector(`[data-item="${index}"]`);
      box.classList.add("winner"); // Add a 'winner' class for styling
    });
  }

  /**
   * Switches the current player
   */
  switchPlayer() {
    this.isPlayer1 = !this.isPlayer1;
    this.currentPlayer = this.isPlayer1 ? this.player1 : this.player2;
    this.msg = `Player ${this.currentPlayer}'s turn!`; // Update message
  }
}

// Initialize and start the game
const ticTacToe = new TicTacToe();
ticTacToe.init();
