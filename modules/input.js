import { canvas } from "./canvas.js";
import { Cube } from "./cube.js";
import { cubeGrid } from "./data.js";
import { Movable, Player } from "./Entities.js";

export class Input {
  constructor() {
    canvas.addEventListener("click", this.handleClick.bind(this));
  }

  /**
   *
   * @param {Event & {target : HTMLElement}} e
   */
  handleClick = (e) => {
    const sizeCanvas = canvas.getBoundingClientRect();
    const mousePosition = {
      x: e.x - sizeCanvas.x,
      y: e.y - sizeCanvas.y,
    };
    const cubeClicked = this.getSelectedCube(mousePosition);
    const canWalk = this.checkMovable(cubeClicked);
    if (!canWalk) return;
    this.walk(cubeClicked);
  };

  getPlayerPosition() {
    return cubeGrid.find((item) => item instanceof Player);
  }

  getSelectedCube = ({ x, y }) => {
    const surPlus = {
      x: 2,
      y: 3,
    };
    // * get the mouse position on the whole window and subtract based on the applied style
    // * transform: translate(-50% , 50%);
    const mousePos = {
      x: Math.floor(x / surPlus.x),
      y: Math.floor(y / surPlus.y),
    };
    return cubeGrid.find((item) => {
      // * when click on an item this checks whether the cursor is positioned
      //* inside the correct item's border based on there x , y position

      const itemLeftSide = item.position.x;
      const itemTopSide = item.position.y;
      const checkHorizontal =
        mousePos.x >= itemLeftSide && mousePos.x <= itemLeftSide + Cube.Width;
      const checkVertical =
        mousePos.y >= itemTopSide && mousePos.y <= itemTopSide + Cube.Height;

      if (checkHorizontal && checkVertical) {
        return item;
      }
    });
  };

  /**
   *
   * @param {Cube} item
   */
  checkMovable = (item) => {
    return item instanceof Movable;
  };

  /**
   *
   * @param {Movable} target
   */
  walk = (target) => {
    const targetPos = target.position;
    const { x: targetX, y: targetY } = targetPos;
    const player = this.getPlayerPosition();
    const visited = {};
    const queue = [player.position];
    const targetKey = `${targetX}x${targetY}`;
    while (queue.length > 0) {
      console.log("hier");
      const { x, y } = queue.shift();
      const currentKey = `${x}x${y}`;
      const neighbors = this.getNeighbors({ x, y });

      for (let index = 0; index < neighbors.length; index++) {
        const { x: rowX, y: colY } = neighbors[index];
        const key = `${rowX}x${colY}`;
        if (key in visited) continue;

        if (key === targetKey) {
          console.log("ouais");
          return;
        }
        visited[key] = true;
        queue.push(key);
      }
    }
  };

  /**
   *
   * @param {{x : number, y : number}} item
   */
  getNeighbors({ x, y }) {
    return [
      {
        // top
        x: x - Cube.Height,
        y: y,
      },
      {
        // bottom
        x: x + Cube.Height,
        y: y,
      },
      {
        // right
        x: x,
        y: y + Cube.Width,
      },
      {
        //left
        x: x,
        y: y - Cube.Width,
      },
    ];
    // const found = cubeGrid.find(cube => {
    //     if(cube.id === item.id){
    //         return
    //     }
    // })
  }
}
