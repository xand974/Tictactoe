import {ctx} from './canvas.js';
import {Sprite} from './sprite.js';

export class Player extends Sprite {
  constructor({color = 'orange', position, positionInGrid}) {
    super({color, position, positionInGrid});
    this.pm = 3;
    this.pa = 6;
    this.maxHealth = 100;
    this.health = this.maxHealth;
  }

  moveTo(target, moveAmount) {
    if (this.pm <= 0) return;
    ctx.clearRect(
      this.position.x,
      this.position.y,
      Sprite.Width,
      Sprite.Height
    );
    ctx.fillStyle = this.color;
    this.position = {
      ...target,
    };
    this.pm -= moveAmount;
    ctx.fillRect(target.x, target.y, Sprite.Width, Sprite.Height);
  }

  generatePath({selectedPath, board}) {
    const queue = [this.positionInGrid];
    const visited = {};
    while (queue.length > 0) {
      const {x, y} = queue.shift();
      const parentKey = `${x}x${y}`;
      const parentNode = board[x][y];
      const neighbors = [
        {
          //left
          x: x - 1,
          y: y,
        },
        {
          //right
          x: x + 1,
          y: y,
        },
        {
          //top
          x: x,
          y: y - 1,
        },
        {
          //right
          x: x,
          y: y + 1,
        },
      ];

      for (let i = 0; i < neighbors.length; i++) {
        const nRow = neighbors[i].x;
        const nCol = neighbors[i].y;

        if (nRow < 0 || nRow > board.length - 1) continue;
        if (nCol < 0 || nCol > board.length - 1) continue;

        const nKey = `${nRow}x${nCol}`;
        if (nKey in visited) continue;

        visited[nKey] = {
          //parent key
          key: parentKey,
          //parent node
          cell: parentNode,
        };
        queue.push(neighbors[i]);
      }
    }

    const path = [];
    let targetKey = `${selectedPath.positionInGrid.x}x${selectedPath.positionInGrid.y}`;
    let cellClicked =
      board[selectedPath.positionInGrid.x][selectedPath.positionInGrid.y];
    while (!(cellClicked instanceof Player)) {
      path.push(cellClicked);
      const {key, cell} = visited[targetKey];
      cellClicked = cell;
      targetKey = key;
    }

    for (let i = 1; i < path.length; i++) {
      path[i].setHover();
      path[i].markAsHovered();
    }
    this.moveTo({x: selectedPath.position.x, y: selectedPath.position.y}, 1);
  }
}
