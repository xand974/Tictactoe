import { Boundary } from "./boundary.js";
import { canvas, ctx } from "./canvas.js";
import { Sprite } from "./sprite.js";

export class InputHandler {
  constructor({ board }) {
    this.board = board;
    canvas.addEventListener("click", this.handleClick.bind(this));
    canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  //works only for 1080p
  handleClick(e) {
    const selectedTile = this.board.find((item) => this.checkBorder(item, e));
    if (!selectedTile || selectedTile instanceof Boundary) return;
    selectedTile.setHover();
    selectedTile.markAsHovered();
  }

  handleMouseMove(e) {
    // * CA MARCHE
    // const selectedTile = this.board.find((item) => this.checkBorder(item, e));
    // if (!selectedTile || selectedTile instanceof Boundary) return;
    // selectedTile.setHover();
    // selectedTile.markAsHovered();
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
