import { Sprite } from "./sprite.js";

export class Boundary extends Sprite {
  constructor({ color = "red", position }) {
    super({ color, position });
  }
}
