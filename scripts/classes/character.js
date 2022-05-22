import { Sprite } from "./sprite.js";
import { canvas } from "../canvas.js";
import { gravity, enemy } from "../obj/instance.js";
import { UIManager } from "./ui.js";

export class Character extends Sprite {
  constructor({ position, color, name }) {
    super({ position, color });
    this.health = 100;
    this.name = name;
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

  #attack(amount) {
    this.isAttacking = true;
    this.drawAttackBox();
    if (!this.checkCollision()) return;
    this.health -= amount;
    UIManager.Instance.decreaseHealthBar(this.name);
  }

  receiveDamage() {}

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
      return true;
    }
    return false;
  }

  /**
   * move left or right
   * @param {string[]} keys
   * @returns
   */

  handleInputs(keys, lastKey) {
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
        if (keys.includes("e")) this.#attack(1);
        break;
      default:
        break;
    }
  }
}
