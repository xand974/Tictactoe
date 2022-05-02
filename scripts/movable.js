import { Sprite } from "./sprite.js";
export class Movable extends Sprite {
  constructor({ color = "green", position, isHovered }) {
    super({ color, position });
    this.isHovered = isHovered;
  }

  markAsHovered() {
    this.isHovered = true;
    if (this.isHovered) {
      const id = setTimeout(() => {
        clearTimeout(id);
        this.resetColor();
      }, 500);
    }
  }
}
