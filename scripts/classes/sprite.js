import { ctx } from "../canvas.js";

export class Sprite {
  static Width = 100;
  static Height = 150;

  constructor({ position, color }) {
    this.position = position;
    this.color = color;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.maxSpeed = 10;
    this.isInTheAir = false;
    this.jumpForce = 10;
    this.id = Math.floor(Math.random() * 50);
    this.attackBox = {
      position: this.position,
      width: Sprite.Width + 20,
      height: 20,
    };

    this.isAttacking = false;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
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
