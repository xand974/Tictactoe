import { canvas, ctx } from "../canvas.js";
import { Player } from "./player.js";
export class Sprite {
  static Width = 100;
  static Height = 150;
  constructor({ position, color }) {
    this.position = position;
    this.color = color;
    this.gravity = 5;
    this.velocity = 0;
    this.maxSpeed = 10;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, Sprite.Width, Sprite.Height);
  }

  /**
   * fall
   * @returns
   */
  setGravity() {
    if (this.position.y + Sprite.Height >= canvas.height) {
      //touch the floor
      this.position.y = canvas.height - Sprite.Height;
      this.draw();
      return;
    }
    this.position.y += this.gravity;
    this.draw();
  }

  /**
   * move left or right
   * @param {string[]} keys
   * @returns
   */
  handleInputs(keys) {
    if (!(this instanceof Player)) return;
    this.position.x += this.velocity;
    if (keys.includes("q")) {
      if (this.position.x <= 0) {
        this.position.x = 0;
      }
      this.velocity = -this.maxSpeed;
    } else if (keys.includes("d")) {
      if (this.position.x >= canvas.width - Sprite.Width) {
        this.position.x = canvas.width - Sprite.Width;
      }
      this.velocity = this.maxSpeed;
    } else {
      this.velocity = 0;
    }
  }
}
