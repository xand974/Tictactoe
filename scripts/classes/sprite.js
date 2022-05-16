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
    this.isInTheAir = false;
    this.jumpForce = 200;
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

  #jump(keys) {
    this.checkCollision();
    if (this.isInTheAir) return;
    this.position.y -= this.jumpForce;
    if (keys.includes(" ") && keys.includes("q")) {
      this.position.y -= this.jumpForce;
      this.#goTo("left");
      return;
    }
    if (keys.includes(" ") && keys.includes("d")) {
      this.position.y -= this.jumpForce;
      this.#goTo("right");
      return;
    }
  }

  #goTo(direction) {
    this.#setFloatingVelocity();
    this.position.x += this.velocity;
    this.checkCollision();
    switch (direction) {
      case "left":
        this.#checkOverlap(direction);
        this.velocity = -this.maxSpeed;
        break;
      case "right":
        this.#checkOverlap(direction);
        this.velocity = this.maxSpeed;
        break;
      default:
        this.velocity = 0;
        break;
    }
  }

  #setFloatingVelocity() {
    if (this.isInTheAir) {
      this.velocity /= 2;
      return;
    }

    this.velocity = this.velocity;
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
    if (this.position.y + Sprite.Height === canvas.height) {
      this.isInTheAir = false;
      return;
    }
    this.isInTheAir = true;
  }

  checkCollision() {}
}
