import { canvas, ctx } from "./canvas.js";
export class Sprite {
  static Width = canvas.width / 12;
  static Height = canvas.width / 12;
  constructor({ color, position }) {
    this.color = color;
    this.position = position;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
  }

  setHover() {
    ctx.clearRect(
      this.position.x,
      this.position.y,
      Sprite.Width,
      Sprite.Height
    );
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
  }

  resetColor() {
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
