import { Sprite } from "./sprite.js";

export class Enemy extends Sprite {
  constructor({ position, color = "black" }) {
    super({ position, color });
  }
}
