class SnakeAndLadder {
  grid;
  players;
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

  constructor(grid = 10, players = 2) {
    this.grid = grid; // number of cells
    this.players = players; // number of players
  }

  init() {
    //generate a board game
    this.generateBoard();
    //add event listeners
  }

  generateBoard() {
    const board = document.getElementById("board");

    //upside down (1 to 100)
    /* for (let index = 0; index < this.grid; index++) {
      for (let i = 0; i < this.grid; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        let id;
        //To print zig-zag numbers 
        if (index % 2 === 0) {
          id = i + index * this.grid + 1;
        } else {
          id = index * this.grid + (this.grid - i);
        }
        cell.innerText = id;
        cell.dataset.index = id;
        board.appendChild(cell);
      }
    } */

    //Bottoms Up (100 to 1)
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
        this.paintBoardCellBG(cell, id);
        cell.innerText = id;
        cell.dataset.index = id;
        board.appendChild(cell);
      }
    }
  }

  paintBoardCellBG(cell, id) {
    cell.classList.add("cell");
    id % 2 === 0 ? cell.classList.add("even") : cell.classList.add("odd");
    if (this.snakes[id]) {
      cell.classList.add("snake-start");
    }
    if (this.ladders[id]) {
      cell.classList.add("ladder-start");
    }
  }
}

const game = new SnakeAndLadder(10, 2);
game.init();
