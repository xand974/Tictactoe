import { ctx } from "./canvas.js";
import { Sprite } from "./sprite.js";

export class Player extends Sprite {
  constructor({ color = "orange", position }) {
    super({ color, position });
    this.pm = 3;
    this.pa = 6;
    this.maxHealth = 100;
    this.health = this.maxHealth;
  }

  moveTo(target, moveAmount) {
    if (this.pm <= 0) return;
    ctx.clearRect(
      this.position.x,
      this.position.y,
      Sprite.Width,
      Sprite.Height
    );
    ctx.fillStyle = this.color;
    this.position = {
      ...target,
    };
    this.pm -= moveAmount;
    ctx.fillRect(target.x, target.y, Sprite.Width, Sprite.Height);
  }
}
