import { Sprite } from "./sprite.js";
import { canvas } from "../canvas.js";
import { gravity } from "../obj/instance.js";
import { UIManager } from "./ui.js";
import { checkOverlap, isColliding } from "../utils.js";

export class Character extends Sprite {
  static Instances = [];
  constructor({ position, color, name, src }) {
    super({ position, color, src });
    this.health = 100;
    this.name = name;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.maxSpeed = 10;
    this.isInTheAir = false;
    this.jumpForce = 10;
    this.isAttacking = false;
    Character.Instances.push(this);
  }

  /**
   * fall
   * @returns
   */
  setGravity() {
    this.drawImg();
    this.position.y += this.velocity.y;
    if (this.position.y + Sprite.Height >= canvas.height) {
      //touch the floor
      this.velocity.y = 0;
      return;
    }
    this.velocity.y += gravity;
  }

  #jump() {
    if (this.isInTheAir) return;
    this.velocity.y -= this.jumpForce;
  }

  /**
   *
   * @param {'left' | 'right'} direction
   */
  #goTo(direction) {
    this.position.x += this.velocity.x;
    checkOverlap(direction, this.position);
    switch (direction) {
      case "left":
        this.velocity.x = -this.maxSpeed;
        break;
      case "right":
        this.velocity.x = this.maxSpeed;
        break;
      default:
        this.velocity.x = 0;
        break;
    }
  }

  #attack(amount) {
    const enemy = Character.Instances.filter(
      (item) => item.name !== this.name
    )[0];
    if (!enemy) return;

    this.isAttacking = true;
    this.drawAttackBox();
    if (!isColliding(this.attackBox, enemy)) return;

    enemy.health -= amount;
    UIManager.Instance.decreaseHealthBar(enemy.name);
  }

  onDie(die) {
    if (this.health <= 0) {
      die();
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
