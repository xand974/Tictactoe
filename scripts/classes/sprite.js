import { ctx } from "../canvas.js";

export class Sprite {
  static Width = 100;
  static Height = 150;

  constructor({ position, color, src }) {
    this.src = src;
    this.img = new Image();
    this.img.src = this.src;
    this.img.onload = () => {
      this.width = this.img.width;
      this.height = this.img.height;
    };
    this.position = position;
    this.color = color;
    this.attackBox = {
      position: this.position,
      width: Sprite.Width + 20,
      height: 20,
    };
    this.crop = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
  }

  drawImg() {
    ctx.drawImage(
      this.img,
      this.crop.x,
      this.crop.y,
      this.width / 4,
      this.height,
      this.position.x,
      this.position.y,
      this.width * 2.5,
      this.height * 4
    );
  }

  drawAttackBox() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
  }
}
