import { Character } from "./character.js";
import { canvas, ctx } from "../canvas.js";
import { Sprite } from "./sprite.js";
import { InputHandler } from "./input.js";
import { UIManager } from "./ui.js";
import { winnerTemplate } from "../template/winner.js";

export class Game {
  /** 
   * player
    @type {Character}
    */
  #player;

  /**
   * enemy
   * @type {Enemy}
   */
  #enemy;

  /**
   * determines the floor position
   * @type {number}
   */
  floor;

  /**
   * handles inputs
   * @type {InputHandler}
   */
  inputs;

  /**
   * check whether the game is finished
   * @type {boolean}
   */
  endgame;

  /**
   * id - track request animation frame
   * @type {number}
   */
  id;

  constructor({ player, enemy }) {
    this.#player = player;
    this.#enemy = enemy;
    this.floor = canvas.height + Sprite.Height;
    this.inputs = new InputHandler();
    this.endgame = false;
    this.id = 0;
    /**
     * @type {Character[]}
     */
    this.entities = [this.#player, this.#enemy];
  }

  init() {
    UIManager.Instance.startTimer();
    for (const entity of this.entities) {
      entity.draw();
    }
  }

  animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const entity of this.entities) {
      entity.setGravity();
      entity.checkIsInTheAir();
      entity.onDie(() => {
        UIManager.Instance.stopTimer();
        this.end();
      });
    }
  }

  play() {
    this.id = requestAnimationFrame(() => {
      this.play();
      this.animate();
      this.#player.handleInputs(this.inputs.keys, this.inputs.lastKey);
      if (this.endgame) {
        cancelAnimationFrame(this.id);
        return;
      }
    });
  }

  end() {
    this.endgame = true;

    // * destroy all instances
    Character.Instances = [];

    // * get the first character with the more life amount left
    const winner = this.entities.sort((a, b) => b.health - a.health)[0];

    // * display it
    document.body.innerHTML = winnerTemplate(winner.name);
    return;
  }
}
