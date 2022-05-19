export class InputHandler {
  constructor() {
    this.keys = [];
    this.lastKey = "";
    window.addEventListener("keydown", this.down.bind(this));
    window.addEventListener("keyup", this.up.bind(this));
  }

  /**
   * " " === space
   * @param {KeyboardEvent} e
   */
  down(e) {
    if (
      (e.key === "q" || e.key === "d" || e.key === " " || e.key == "e") &&
      this.keys.indexOf(e.key) === -1
    ) {
      this.keys.push(e.key);
      this.lastKey = e.key;
    }
  }

  /**
   * " " === space
   * @param {KeyboardEvent} e
   */
  up(e) {
    if (e.key === "q" || e.key === "d" || e.key === " " || e.key === "e") {
      this.keys.splice(this.keys.indexOf(e.key), 1);
      this.lastKey = "";
    }
  }
}
