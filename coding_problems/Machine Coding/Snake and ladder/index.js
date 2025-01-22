class SnakeAndLadder {
  grid;
  numberOfPlayers;
  snakes = {
    28: 10,
    37: 3,
    48: 16,
    75: 32,
    94: 71,
    96: 42,
  };
  ladders = {
    4: 56,
    12: 50,
    14: 55,
    22: 58,
    41: 79,
    54: 88,
  };

  playerPositions = {};
  rollerButton;

  constructor(grid = 10, players = 2) {
    this.grid = grid;
    this.numberOfPlayers = players;
    this.initializePlayerPositions();
  }

  // Initialize players' starting positions
  initializePlayerPositions() {
    for (let i = 1; i <= this.numberOfPlayers; i++) {
      this.playerPositions[`player${i}`] = 0;
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

        //cell.innerText = cellId;
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
    this.rollerButton = document.getElementById("roller");
    this.rollerButton.addEventListener("click", (e) => this.handleDiceRoll(e));
  }

  // Handle dice roll logic
  handleDiceRoll(event) {
    this.rollerButton.disabled = true;

    this.playSound("dice");
    const diceRoll = this.rollDice(); // Updated variable name

    this.animateDiceRoll(diceRoll, () => {
      console.log(`Rolled: ${diceRoll}`);
      // Add logic to update player position here
      this.updatePlayerPosition(diceRoll);
    });
  }

  // Simulate rolling the dice
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Animate dice roll and update the dice display
  animateDiceRoll(diceRoll, callback) {
    const dice = document.getElementById("dice");
    const diceLabel = document.getElementById("dice-number-label");

    dice.setAttribute("src", "./images/dice/dice-rolling.gif");

    setTimeout(() => {
      dice.setAttribute("src", `./images/dice/dice-${diceRoll}.png`);
      dice.setAttribute("title", diceRoll);
      diceLabel.innerHTML = `<p>Number: ${diceRoll}</p>`;
      callback();
    }, 1000);
  }

  updatePlayerPosition(number, type = "move") {
    this.rollerButton.disabled = true;
    if (type === "move") {
      this.playerPositions.player1 += 50;
    } else if (type === "snakeBite") {
      this.playerPositions.player1 = this.snakes[this.playerPositions.player1];
    } else if (type === "ladder") {
      this.playerPositions.player1 = this.ladders[this.playerPositions.player1];
    }

    //Invalid move
    if (this.playerPositions.player1 > this.grid * this.grid) {
      this.rollerButton.disabled = false;
      return;
    }

    this.movePlayerToNewPosition(this.playerPositions.player1, () => {
      const snakeBite = this.checkForSnakeBite(this.playerPositions.player1);
      if (snakeBite) {
        this.playSound("snake");
        this.updatePlayerPosition(
          this.snakes[this.playerPositions.player1],
          "snakeBite"
        );
      }
      const hasLadder = this.checkForLadder(this.playerPositions.player1);
      if (hasLadder) {
        this.playSound("ladder");
        this.updatePlayerPosition(
          this.ladders[this.playerPositions.player1],
          "ladder"
        );
      }
      const winner = this.checkForWinner(this.playerPositions.player1);
      if (winner) this.declareWinner();

      this.rollerButton.disabled = false;
    });
  }

  declareWinner() {
    console.log("Winner");
  }

  checkForWinner(position) {
    return position === this.grid * this.grid;
  }

  checkForSnakeBite(cell) {
    return this.snakes.hasOwnProperty(cell);
  }

  checkForLadder(cell) {
    return this.ladders.hasOwnProperty(cell);
  }

  movePlayerToNewPosition(cellNumber, done) {
    this.playSound("run");
    const cellOffset = document.getElementById(cellNumber);
    const player1 = document.getElementById("player1");
    player1.style.left = cellOffset.offsetLeft + 10 + "px";
    player1.style.top = cellOffset.offsetTop + 50 + "px";
    setTimeout(() => {
      done();
    }, 2000);
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
