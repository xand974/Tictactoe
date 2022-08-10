import { Cube } from "./cube.js";

export class Player extends Cube {
  constructor(position) {
    super("blue", position);
  }
}

export class Boundary extends Cube {
  constructor(position) {
    super("red", position);
  }
}

export class Movable extends Cube {
  constructor(position) {
    super("green", position);
  }
}
