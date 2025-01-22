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

  player1Position = {};
  player2Position = {};

  constructor(grid = 10, players = 2) {
    this.grid = grid; // number of cells
    this.numberOfPlayers = players; // number of players
  }

  init() {
    //generate a board game
    this.generateBoard();
    //add event listeners
    this.addListeners();
  }

  generateBoard() {
    const board = document.getElementById("board");

    //(100 to 1)
    for (let index = this.grid; index >= 1; index--) {
      for (let i = 1; i <= this.grid; i++) {
        const cell = document.createElement("div");
        let id;
        //To print zig-zag numbers
        if (index % 2 === 0) {
          id = index * this.grid - (i - 1);
        } else {
          id = index * this.grid - (this.grid - i);
        }

        cell.innerText = id;
        cell.dataset.index = id;
        cell.id = id;
        this.paintBoardCellBG(cell, id);
        board.appendChild(cell);
      }
    }
    this.paintSnakeLadderCellBG();
  }

  paintBoardCellBG(cell, id) {
    cell.classList.add("cell");
    id % 2 === 0 ? cell.classList.add("even") : cell.classList.add("odd");
  }

  paintSnakeLadderCellBG() {
    //snakes
    for (let id in this.snakes) {
      const snakeStartCell = document.getElementById(id);
      snakeStartCell.classList.add("snake-start");
      const snakeEndCell = document.getElementById(this.snakes[id]);
      snakeEndCell.classList.add("snake-end");
    }
    //ladders
    for (let id in this.ladders) {
      const ladderStartCell = document.getElementById(id);
      ladderStartCell.classList.add("ladder-start");
      const ladderEndCell = document.getElementById(this.ladders[id]);
      ladderEndCell.classList.add("ladder-end");
    }
  }

  addListeners() {
    const rollerBtn = document.getElementById("roller");
    rollerBtn.addEventListener("click", (e) => {
      this.playSound();
      e.target.disabled = true;
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const diceLabel = document.getElementById("dice-number-label");
      const dice = document.getElementById("dice");
      dice.setAttribute("src", "./images/dice/dice-rolling.gif");
      setTimeout(() => {
        dice.setAttribute("src", `./images/dice/dice-${randomNumber}.png`);
        dice.setAttribute("title", randomNumber);
        diceLabel.innerHTML = `<p>Number : ${randomNumber}</p>`;
        e.target.disabled = false;
      }, 1000);
    });
  }

  handleRoller() {}

  updatePlayerPosition() {
    console.log("updatePlayerPosition");
  }

  playSound(type = "dice") {
    let url = "";
    switch (type) {
      case "dice":
        url = "./sound/dice-rolling.mp3";
        break;
      case "run":
        url = "./sound/running.mp3";
        break;
      case "snake":
        url = "./sound/snake-hiss.m4a";
        break;
      case "ladder":
        url = "./sound/energy-up.mp3";
        break;
      default:
        url = "./sound/dice-rolling.mp3";
    }
    new Audio(url).play();
  }
}

const game = new SnakeAndLadder(10, 2);
game.init();
