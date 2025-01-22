class SnakeAndLadder {
  grid;
  numberOfPlayers;
  snakes = {
    32: 10,
    36: 6,
    48: 26,
    62: 18,
    88: 24,
    95: 56,
    97: 78,
  };
  ladders = {
    1: 38,
    4: 14,
    8: 30,
    21: 42,
    28: 76,
    50: 67,
    71: 92,
    80: 99,
  };

  playerPositions = {};

  constructor(grid = 10, players = 2) {
    this.grid = grid;
    this.numberOfPlayers = players;
    this.initializePlayerPositions();
  }

  // Initialize players' starting positions
  initializePlayerPositions() {
    for (let i = 1; i <= this.numberOfPlayers; i++) {
      this.playerPositions[`player${i}`] = 1;
    }
  }

  init() {
    this.generateBoard();
    this.addEventListeners();
  }

  // Generate the game board
  generateBoard() {
    const board = document.getElementById("board");
    board.innerHTML = ""; // Clear existing content (if any)

    for (let row = this.grid; row >= 1; row--) {
      for (let col = 1; col <= this.grid; col++) {
        const cell = document.createElement("div");
        const cellId = this.calculateCellId(row, col);

        cell.innerText = cellId;
        cell.dataset.index = cellId;
        cell.id = cellId;
        this.styleCell(cell, cellId);

        board.appendChild(cell);
      }
    }

    this.highlightSnakesAndLadders();
  }

  // Calculate cell ID for zig-zag pattern
  calculateCellId(row, col) {
    return row % 2 === 0
      ? row * this.grid - (col - 1)
      : row * this.grid - (this.grid - col);
  }

  // Style individual cells
  styleCell(cell, cellId) {
    cell.classList.add("cell");
    cell.classList.add(cellId % 2 === 0 ? "even" : "odd");
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
    const rollerButton = document.getElementById("roller");
    rollerButton.addEventListener("click", (e) => this.handleDiceRoll(e));
  }

  // Handle dice roll logic
  handleDiceRoll(event) {
    const rollerButton = event.target;
    rollerButton.disabled = true;

    this.playSound("dice");
    const randomNumber = this.rollDice();

    this.animateDiceRoll(randomNumber, () => {
      rollerButton.disabled = false;
      console.log(`Rolled: ${randomNumber}`);
      // Add logic to update player position here
    });
  }

  // Simulate rolling the dice
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Animate dice roll and update the dice display
  animateDiceRoll(randomNumber, callback) {
    const dice = document.getElementById("dice");
    const diceLabel = document.getElementById("dice-number-label");

    dice.setAttribute("src", "./images/dice/dice-rolling.gif");

    setTimeout(() => {
      dice.setAttribute("src", `./images/dice/dice-${randomNumber}.png`);
      dice.setAttribute("title", randomNumber);
      diceLabel.innerHTML = `<p>Number: ${randomNumber}</p>`;
      callback();
    }, 1000);
  }

  // Play sound effects
  playSound(type = "dice") {
    const soundMap = {
      dice: "./sound/dice-rolling.mp3",
      run: "./sound/running.mp3",
      snake: "./sound/snake-hiss.m4a",
      ladder: "./sound/energy-up.mp3",
    };
    const soundUrl = soundMap[type] || soundMap.dice;
    new Audio(soundUrl).play();
  }
}

const game = new SnakeAndLadder(10, 2);
game.init();
