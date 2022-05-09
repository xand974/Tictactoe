import { Sprite } from "./sprite.js";
export class Movable extends Sprite {
  constructor({ color = "green", position, isHovered, positionInGrid }) {
    super({ color, position, positionInGrid });
    this.isHovered = isHovered;
  }
}
