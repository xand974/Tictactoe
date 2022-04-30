import { canvas } from "./canvas.js";
export class Sprite {
  static Width = canvas.width / 4;
  static Height = canvas.height / 4;
  constructor({ color, position }) {
    this.color = color;
    this.position = position;
  }

  draw(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
  }

  setHover(ctx) {
    ctx.clearRect(
      this.position.x,
      this.position.y,
      Sprite.Width,
      Sprite.Height
    );
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
  }
}
