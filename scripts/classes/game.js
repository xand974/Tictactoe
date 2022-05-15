import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { canvas, ctx } from "../canvas.js";
import { Sprite } from "./sprite.js";
import { InputHandler } from "./input.js";

export class Game {
  /** 
    @type {Player}
    */
  player;

  /**
   * @type {Enemy}
   */
  enemy;

  constructor({ player, enemy }) {
    this.player = player;
    this.enemy = enemy;
    this.floor = canvas.height + Sprite.Height;
    this.inputs = new InputHandler();
  }

  init() {
    this.player.draw();
    this.enemy.draw();
  }

  animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.player.setGravity();
    this.enemy.setGravity();
  }

  play() {
    requestAnimationFrame(() => {
      this.play();
    });
    this.animate();
    this.player.handleInputs(this.inputs.keys);
  }
}
