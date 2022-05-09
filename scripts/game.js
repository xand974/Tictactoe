import { Boundary } from "./boundary.js";
import { Sprite } from "./sprite.js";
import { canvas, ctx } from "./canvas.js";
import { Movable } from "./movable.js";
import { InputHandler } from "./inputs.js";
import { Player } from "./player.js";
import { UI } from "./ui.js";
export class GameManager {
  static Instance = new GameManager();
  constructor() {
    this.board = [];
    this.player = new Player({});
    this.entities = ["player", "movable", "boundary"];
    this.grid = [];
    this.playerInArray = false;
    // new UI();
    this.initBoard();
    this.inputHandler = new InputHandler({
      board: this.board,
      player: this.player,
      grid: this.grid,
    });
  }

  initGame() {
    this.draw();
  }

  initBoard() {
    for (let row = 0, i = 0; row < canvas.width; row += Sprite.Height, i++) {
      let rowArray = [];
      let gridArray = [];

      for (
        let column = 0, j = 0;
        column < canvas.height;
        column += Sprite.Width, j++
      ) {
        column = Math.floor(column);
        row = Math.floor(row);
        let random = Math.floor(Math.random() * this.entities.length);
        switch (random) {
          case 0:
            gridArray.push(0);
            rowArray.push(
              new Boundary({
                position: { x: row, y: column },
                positionInGrid: { x: i, y: j },
              })
            );
            break;
          case 1:
            gridArray.push(1);
            rowArray.push(
              new Movable({
                position: { x: row, y: column },
                positionInGrid: { x: i, y: j },
              })
            );
            break;
          case 2:
            if (!this.playerInArray) {
              this.player = new Player({
                ...this.player,
                position: {
                  x: row,
                  y: column,
                },
                positionInGrid: {
                  x: i,
                  y: j,
                },
              });
              gridArray.push(2);
              rowArray.push(this.player);
              this.playerInArray = true;
              break;
            }
            gridArray.push(1);
            rowArray.push(
              new Movable({
                position: { x: row, y: column },
                positionInGrid: { x: i, y: j },
              })
            );
            break;
        }
      }
      this.grid.push(gridArray);
      this.board.push(rowArray);
      rowArray = [];
      gridArray = [];
    }
  }

  animate() {
    this.reset();
    const id = requestAnimationFrame(() => {
      this.animate();
    });
    this.draw();
  }

  reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // TODO position player is static in the array => change it
  draw() {
    for (const item of this.board) {
      for (const i of item) {
        i.draw();
      }
    }
  }
}
