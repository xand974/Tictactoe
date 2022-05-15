import { Sprite } from "./sprite.js";

export class Player extends Sprite {
  constructor({ position, color = "green" }) {
    super({ position, color });
  }
}
