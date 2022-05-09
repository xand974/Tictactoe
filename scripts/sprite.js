import { canvas, ctx } from "./canvas.js";
export class Sprite {
  static Width = canvas.width / 12;
  static Height = canvas.width / 12;
  constructor({ color, position, positionInGrid }) {
    this.color = color;
    this.position = position;
    this.positionInGrid = positionInGrid;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
  }

  setHover() {
    this.color = "blue";
    ctx.clearRect(
      this.position.x,
      this.position.y,
      Sprite.Width,
      Sprite.Height
    );
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
  }
  markAsHovered() {
    this.isHovered = true;
    if (this.isHovered) {
      const id = setTimeout(() => {
        clearTimeout(id);
        this.resetColor();
      }, 500);
    }
  }

  resetColor() {
    this.color = "green";
    ctx.clearRect(
      this.position.x,
      this.position.y,
      Sprite.Width,
      Sprite.Height
    );
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
  }
}
