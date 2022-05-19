import { canvas, ctx } from "../canvas.js";
import { gravity, enemy } from "../obj/instance.js";
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
        if (keys.includes(" ")) this.#jump(keys);
        break;
      case "e":
        if (keys.includes("e")) this.#attack();
        break;
      default:
        break;
    }
  }

  /**
   *
   * @param {Sprite} enemy
   */
  #attack() {
    this.isAttacking = true;
    this.checkCollision();
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
  }

  #jump() {
    this.checkCollision();
    if (this.isInTheAir) return;
    this.velocity.y -= this.jumpForce;
  }

  #goTo(direction) {
    this.position.x += this.velocity.x;
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

  /**
   *
   * @param {Sprite} target
   */
  checkCollision() {
    if (!this.isAttacking) return;
    const leftCollision =
      this.attackBox.position.x + this.attackBox.width >= enemy.position.x;
    const rightCollision =
      this.attackBox.position.x <= enemy.position.x + Sprite.Width;
    const topCollision =
      this.attackBox.position.y + this.attackBox.height >= enemy.position.y;
    const bottomCollision =
      this.attackBox.position.y <= enemy.position.y + Sprite.Height;

    if (rightCollision && leftCollision && topCollision && bottomCollision) {
      console.log("proceed to attack");
    }
  }
}
