import { Boundary } from "./boundary.js";
import { canvas, ctx } from "./canvas.js";
import { Movable } from "./movable.js";
import { Sprite } from "./sprite.js";

export class InputHandler {
  constructor({ board, player }) {
    /**
     * @type {Sprite[][]}
     */
    this.board = board;
    this.player = player;
    canvas.addEventListener("click", this.handleClick.bind(this));
    canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  handleClick(e) {
    if (this.player.pm <= 0) return;
    /**
     * @type {Movable}
     */
    const selectedTile = this.board.reduce(
      (prev, boardItem) =>
        prev || boardItem.find((item) => this.checkBorder(item, e)),
      undefined
    );
    if (!selectedTile || selectedTile instanceof Boundary) return;
    // selectedTile.setHover();
    this.player.moveTo(
      {
        x: selectedTile.position.x,
        y: selectedTile.position.y,
      },
      1
    );
  }

  // TODO - Redo that case
  handleMouseMove(e) {
    const indexOfPlayerInArray = this.getPlayerInArray(e);
    let paths = [];
    for (const [index, item] of this.board.entries()) {
      if (
        indexOfPlayerInArray - this.player.pm <= index &&
        indexOfPlayerInArray + this.player.pm >= index &&
        indexOfPlayerInArray !== index &&
        item instanceof Movable &&
        !(item instanceof Boundary)
      ) {
        const pathTile = this.board[index];
        paths.push(pathTile);
        pathTile.setHover();
        pathTile.markAsHovered();
        continue;
      }
    }
  }

  generatePath(row, col) {
    const queue = [];

    queue.push(this.player.position);
    while (queue.length > 0) {
      const { x, y } = queue.shift();
      const neighbors = [
        {
          //top
          row: x - Sprite.Height,
          col,
        },
        {
          //right
          row: row,
          col: y + Sprite.Width,
        },
        {
          //bottom
          row: x + Sprite.Height,
          col,
        },
        {
          //left
          row: row,
          col: y - Sprite.Width,
        },
      ];
      for (let index = 0; index < neighbors.length; index++) {}
    }
  }

  getPlayerInArray(e) {
    const selectedTile = this.board.reduce(
      (prev, boardItem) =>
        prev ||
        boardItem.find(
          (item) =>
            item.position.x === this.player.position.x &&
            item.position.y === this.player.position.y &&
            this.checkBorder(item, e)
        ),
      undefined
    );
    if (!selectedTile) return;
    return this.board.reduce(
      (prev, item) => prev || item.indexOf(selectedTile),
      undefined
    );
  }

  checkBorder(item, e) {
    return (
      item.position.x <= Math.floor(e.offsetX) &&
      item.position.x + Sprite.Width >= Math.floor(e.offsetX) &&
      item.position.y <= Math.floor(e.offsetY) &&
      item.position.y + Sprite.Height >= Math.floor(e.offsetY)
    );
  }
}
