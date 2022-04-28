import { Sprite } from "./sprite.js";
export class Movable extends Sprite {
  constructor({ color = "green", position }) {
    super({ color, position });
  }
}
