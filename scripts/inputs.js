import { canvas, ctx } from "./canvas.js";
import { Sprite } from "./sprite.js";

export class InputHandler {
  constructor({ board }) {
    this.board = board;
    canvas.addEventListener("click", this.handleClick.bind(this));
    canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  handleClick(e) {
    const selectedTile = this.board.find((item) => this.checkBorder(item, e));
    selectedTile.setHover(ctx);
  }

  handleMouseMove(e) {
    const selectedTile = this.board.find((item) => this.checkBorder(item, e));
  }

  checkBorder(item, e) {
    // TODO : check la hauteur
    return (
      item.position.x <= e.x - canvas.width + 23 &&
      item.position.x + Sprite.Width - 5 >= e.x - canvas.width + 21
    );
  }
}
