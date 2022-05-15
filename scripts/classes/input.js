import { canvas } from "../canvas.js";

export class InputHandler {
  constructor() {
    this.keys = [];
    document.addEventListener("keyup", this.up.bind(this));
    document.addEventListener("keydown", this.down.bind(this));
  }

  /**
   *
   * @param {KeyboardEvent} e
   */
  up(e) {
    if ((e.key === "q" || e.key === "d") && this.keys.indexOf(e.key) === -1) {
      this.keys.push(e.key);
    }
  }

  /**
   *
   * @param {KeyboardEvent} e
   */
  down(e) {
    if (e.key === "q" || e.key === "d") {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    }
  }
}
