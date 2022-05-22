import {
  playerUI,
  enemyUI,
  player,
  enemy,
  game,
  timer,
} from "../obj/instance.js";

export class UIManager {
  static Instance = new UIManager();

  constructor() {
    this.time = 5;
  }

  startTimer() {
    const id = setInterval(() => {
      this.time--;
      timer.innerHTML = this.time;
      if (this.time <= 0) {
        game.end();
        clearInterval(id);
      }
    }, 1000);
  }

  /**
   *
   * @param {number} amount
   * @param {string} tag
   */
  decreaseHealthBar(tag) {
    switch (tag) {
      case "player":
        playerUI.style.width = `${player.health}%`;
        break;
      case "enemy":
        enemyUI.style.width = `${enemy.health}%`;
        break;
      default:
        return;
    }
  }
}
