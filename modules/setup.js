import { grid, EntityState, cubeGrid } from "./data.js";
import { Movable, Boundary, Player } from "./Entities.js";
import { Cube } from "./cube.js";

const populateGrid = () => {
  let entity;
  for (const [rowKey, row] of grid.entries()) {
    for (const [colKey, column] of row.entries()) {
      switch (column) {
        case 1:
          entity = createEntity(EntityState.Movable, { rowKey, colKey });
          cubeGrid.push(entity);
          break;
        case 2:
          entity = createEntity(EntityState.Player, { rowKey, colKey });
          cubeGrid.push(entity);
          break;
        case 0:
          entity = createEntity(EntityState.Boundary, { rowKey, colKey });
          cubeGrid.push(entity);
        default:
          break;
      }
    }
  }
};

const createEntity = (type, positionIndex) => {
  const position = getPosition(positionIndex);
  switch (type) {
    case EntityState.Boundary:
      return new Boundary(position);
    case EntityState.Player:
      return new Player(position);
    case EntityState.Movable:
      return new Movable(position);
  }
};

/**
 *
 * @returns {{x: number , y : number}}
 */
const getPosition = ({ rowKey, colKey }) => {
  return { x: rowKey * Cube.Width, y: colKey * Cube.Height };
};

const drawGrid = () => {
  for (const col of cubeGrid) {
    col.draw();
  }
};

export { drawGrid, populateGrid };
