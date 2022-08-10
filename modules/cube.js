import { canvas, ctx } from "./canvas.js";
import { generateRandomId } from "./utils.js";

export class Cube {
  static Width = canvas.width / 5;
  static Height = canvas.height / 5;
  /**
   * @param {{x : number, y : number}} position
   * @param {string} color : ;
   */
  constructor(color, position) {
    this.id = generateRandomId();
    this.color = color;
    this.position = position;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, Cube.Width, Cube.Height);
  }

  debug() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.position.x, this.position.y, Cube.Width, Cube.Height);
  }
}
