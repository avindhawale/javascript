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
  currentPlayer = 1;
  message;

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
    this.createPlayers();
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

  createPlayers() {
    const playerStand = document.getElementById("player-stand");
    for (let index = 1; index <= this.numberOfPlayers; index++) {
      const player = document.createElement("img");
      player.setAttribute("src", `./images/players/player_${index}.gif`);
      player.setAttribute("alt", `Player ${index}`);
      player.classList.add("player");
      player.classList.add("player_" + index);
      player.id = "player" + index;
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
    this.message = document.getElementById("message");
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
      //Let the moving animation complete of 2 secs.
      setTimeout(() => {
        this.toggleCurrentPlayer();
      }, 2000);
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
    let currentPlayerPosition =
      this.playerPositions["player" + this.currentPlayer];

    if (type === "move") {
      currentPlayerPosition += number;
    } else if (type === "snakeBite") {
      currentPlayerPosition = this.snakes[currentPlayerPosition];
    } else if (type === "ladder") {
      currentPlayerPosition = this.ladders[currentPlayerPosition];
    }
    this.playerPositions["player" + this.currentPlayer] = currentPlayerPosition;

    //Invalid move
    if (currentPlayerPosition > this.grid * this.grid) {
      this.rollerButton.disabled = false;
      return;
    }

    this.movePlayerToNewPosition(currentPlayerPosition, () => {
      const snakeBite = this.checkForSnakeBite(currentPlayerPosition);
      if (snakeBite) {
        this.playSound("snake");
        this.updatePlayerPosition(
          this.snakes[currentPlayerPosition],
          "snakeBite"
        );
      }
      const hasLadder = this.checkForLadder(currentPlayerPosition);
      if (hasLadder) {
        this.playSound("ladder");
        this.updatePlayerPosition(
          this.ladders[currentPlayerPosition],
          "ladder"
        );
      }
      const winner = this.checkForWinner(currentPlayerPosition);
      if (winner) this.declareWinner();

      this.rollerButton.disabled = false;
    });
  }

  toggleCurrentPlayer() {
    this.numberOfPlayers === this.currentPlayer
      ? (this.currentPlayer = 1)
      : this.currentPlayer++;
    console.log("currentPlayer : ", this.currentPlayer);
    this.message.innerHTML = `Player ${this.currentPlayer}'s turn.`;
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
    const player = document.getElementById("player" + this.currentPlayer);
    player.style.left = cellOffset.offsetLeft + 55 + "px";
    player.style.top = cellOffset.offsetTop + 10 + "px";
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

const game = new SnakeAndLadder(10, 5);
game.init();
