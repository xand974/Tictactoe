import { canvas, ctx } from "../canvas.js";
import { gravity } from "../obj/instance.js";
import { Player } from "./player.js";

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
    this.draw();
    this.position.y += this.velocity.y;
    if (this.position.y + Sprite.Height >= canvas.height) {
      //touch the floor
      this.velocity.y = 0;
      return;
    }
    this.velocity.y += gravity;
  }

  /**
   * move left or right
   * @param {string[]} keys
   * @returns
   */
  handleInputs(keys, lastKey) {
    if (!(this instanceof Player)) return;
    switch (lastKey) {
      case "d":
        if (keys.includes("d")) this.#goTo("right");
        break;
      case "q":
        if (keys.includes("q")) this.#goTo("left");
        break;
      case " ":
        this.#jump(keys);
        break;
      default:
        break;
    }
  }

  #jump() {
    console.log(this.isInTheAir);
    this.checkCollision();
    if (this.isInTheAir) return;
    this.velocity.y -= this.jumpForce;
  }

  #goTo(direction) {
    this.position.x += this.velocity.x;
    // this.checkCollision();
    switch (direction) {
      case "left":
        this.#checkOverlap(direction);
        this.velocity.x = -this.maxSpeed;
        break;
      case "right":
        this.#checkOverlap(direction);
        this.velocity.x = this.maxSpeed;
        break;
      default:
        this.velocity.x = 0;
        break;
    }
  }

  #checkOverlap(direction) {
    switch (direction) {
      case "left":
        if (this.position.x <= 0) this.position.x = 0;
        break;
      case "right":
        if (this.position.x >= canvas.width - Sprite.Width)
          this.position.x = canvas.width - Sprite.Width;
        break;
    }
  }

  checkIsInTheAir() {
    if (this.position.y + Sprite.Height >= canvas.height) {
      this.isInTheAir = false;
      return;
    }
    this.isInTheAir = true;
  }

  checkCollision() {}
}
