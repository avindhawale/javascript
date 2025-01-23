class SnakeAndLadder {
  constructor(grid = 10, players = 2) {
    this.grid = grid;
    this.numberOfPlayers = players;
    this.snakes = {
      28: 10,
      37: 3,
      48: 16,
      75: 32,
      94: 71,
      96: 42,
    };
    this.ladders = {
      4: 56,
      12: 50,
      14: 55,
      22: 58,
      41: 79,
      54: 88,
    };
    this.playerPositions = {};
    this.currentPlayer = 1;
  }

  // Initialize the game
  init() {
    this.generateBoard();
    this.initializePlayerCellPositions();
    this.createPlayers();
    this.addEventListeners();
  }

  // Initialize players' starting positions
  initializePlayerCellPositions() {
    for (let i = 1; i <= this.numberOfPlayers; i++) {
      this.playerPositions[`player${i}`] = 0;
    }
  }

  // Generate the game board
  generateBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    for (let row = this.grid; row >= 1; row--) {
      for (let col = 1; col <= this.grid; col++) {
        const cell = document.createElement("div");
        const cellId = this.calculateCellId(row, col);
        cell.dataset.index = cellId;
        cell.id = cellId;
        this.styleCell(cell, cellId);
        board.appendChild(cell);
      }
    }

    this.highlightSnakesAndLadders();
  }

  // Create player avatars
  createPlayers() {
    const playerStand = document.getElementById("player-stand");
    playerStand.innerHTML = ""; // Clear existing content

    for (let i = 1; i <= this.numberOfPlayers; i++) {
      const player = document.createElement("img");
      player.src = `./images/players/player_${i}.gif`;
      player.alt = `Player ${i}`;
      player.classList.add("player", `player_${i}`);
      player.id = `player${i}`;
      playerStand.appendChild(player);
    }
  }

  // Calculate cell ID for zig-zag pattern
  calculateCellId(row, col) {
    return row % 2 === 0
      ? row * this.grid - (col - 1)
      : row * this.grid - (this.grid - col);
  }

  // Style individual cells
  styleCell(cell, cellId) {
    cell.classList.add("cell", cellId % 2 === 0 ? "even" : "odd");
  }

  // Highlight snake and ladder cells
  highlightSnakesAndLadders() {
    Object.entries(this.snakes).forEach(([start, end]) => {
      document.getElementById(start).classList.add("snake-start");
      document.getElementById(end).classList.add("snake-end");
    });

    Object.entries(this.ladders).forEach(([start, end]) => {
      document.getElementById(start).classList.add("ladder-start");
      document.getElementById(end).classList.add("ladder-end");
    });
  }

  // Add event listeners
  addEventListeners() {
    this.rollerButton = document.getElementById("roller");
    this.rollerButton.addEventListener("click", () => this.handleDiceRoll());

    this.resetButton = document.getElementById("reset");
    this.resetButton.addEventListener("click", () => this.handleResetButton());

    this.message = document.getElementById("message");
    this.diceNumberLabel = document.getElementById("dice-number-label");
  }

  // Handle dice roll logic
  handleDiceRoll() {
    this.rollerButton.disabled = true;

    this.playSound("dice");
    const diceRoll = this.rollDice();

    this.animateDiceRoll(diceRoll, () => {
      console.log(`Rolled: ${diceRoll}`);
      this.updatePlayerPosition(diceRoll);
    });
  }

  // Simulate rolling the dice
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Animate dice roll
  animateDiceRoll(diceRoll, callback) {
    const dice = document.getElementById("dice");
    this.diceNumberLabel = document.getElementById("dice-number-label");

    dice.src = "./images/dice/dice-rolling.gif";

    setTimeout(() => {
      dice.src = `./images/dice/dice-${diceRoll}.png`;
      dice.title = diceRoll;
      this.diceNumberLabel.innerHTML = `<p>Number: ${diceRoll}</p>`;
      callback();
    }, 1000);
  }

  // Update player position
  updatePlayerPosition(diceRoll, type = "move") {
    this.rollerButton.disabled = true;

    let currentPosition = this.playerPositions[`player${this.currentPlayer}`];

    // Handle invalid moves
    if (currentPosition > this.grid * this.grid) {
      this.rollerButton.disabled = false;
      return;
    }

    // Update position based on the type of move
    if (type === "move") {
      currentPosition += diceRoll;
    } else if (type === "snakeBite") {
      currentPosition = this.snakes[currentPosition];
    } else if (type === "ladder") {
      currentPosition = this.ladders[currentPosition];
    }

    this.playerPositions[`player${this.currentPlayer}`] = currentPosition;

    // Move the player and handle post-move logic
    this.movePlayerToNewPosition(currentPosition, () => {
      if (this.handleSnakesOrLadders(currentPosition)) {
        return;
      }

      if (this.checkForWinner(currentPosition)) {
        this.declareWinner();
      } else {
        this.rollerButton.disabled = false;

        // Allow the current player to roll again if they rolled a 6
        if (diceRoll !== 6) {
          this.toggleCurrentPlayer();
        }
      }
    });
  }

  // Handle snake bites or ladders at the player's position
  handleSnakesOrLadders(position) {
    if (this.snakes[position]) {
      this.playSound("snake");
      this.updatePlayerPosition(this.snakes[position], "snakeBite");
      return true; // Player gets another turn
    }

    if (this.ladders[position]) {
      this.playSound("ladder");
      this.updatePlayerPosition(this.ladders[position], "ladder");
      return true; // Player gets another turn
    }

    return false; // No snakes or ladders, normal turn
  }

  // Move player to a new position
  movePlayerToNewPosition(cellNumber, callback) {
    this.playSound("run");
    const targetCell = document.getElementById(cellNumber);
    const player = document.getElementById(`player${this.currentPlayer}`);
    player.style.left = `${targetCell.offsetLeft + 55}px`;
    player.style.top = `${targetCell.offsetTop + 10}px`;

    setTimeout(callback, 2000);
  }

  // Toggle to the next player
  toggleCurrentPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.numberOfPlayers ? 1 : this.currentPlayer + 1;
    this.message.innerHTML = `Player ${this.currentPlayer}'s turn.`;
  }

  // Declare the winner
  declareWinner() {
    this.rollerButton.disabled = true;
    this.message.innerHTML = `Player ${this.currentPlayer} wins!`;
    this.message.classList.add("winner");
    this.showResetButton();
  }

  // Show and hide reset button
  showResetButton() {
    this.resetButton.classList.add("show");
  }

  hideResetButton() {
    this.resetButton.classList.remove("show");
  }

  // Check if a player wins
  checkForWinner(position) {
    return position === this.grid * this.grid;
  }

  // Play sound effects
  playSound(type) {
    const sounds = {
      dice: "./sound/dice-rolling.mp3",
      run: "./sound/running.mp3",
      snake: "./sound/snake-hiss.m4a",
      ladder: "./sound/energy-up.mp3",
    };
    new Audio(sounds[type] || sounds.dice).play();
  }

  // Handle reset button
  handleResetButton() {
    this.hideResetButton();
    this.rollerButton.disabled = false;
    this.message.classList.remove("winner");
    this.currentPlayer = 1;
    this.message.innerHTML = `Player ${this.currentPlayer}'s turn.`;
    this.diceNumberLabel.innerHTML = "";
    this.init();
  }
}

// Initialize the game
const game = new SnakeAndLadder(10, 5);
game.init();
