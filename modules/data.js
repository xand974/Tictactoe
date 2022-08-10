import { Movable, Boundary, Player } from "./Entities.js";

const EntityState = {
  Movable: "movable",
  Player: "player",
  Boundary: "Boundary",
};

const grid = [
  [1, 1, 0, 2, 1],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 0, 0, 1, 0],
  [1, 1, 1, 1, 0],
];

/**
 * @type {(Movable | Boundary | Player)[] }
 */
let cubeGrid = [];

export { grid, EntityState, cubeGrid };
