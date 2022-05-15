import { Player } from "../classes/player.js";
import { Enemy } from "../classes/enemy.js";
import { Game } from "../classes/game.js";
const player = new Player({ position: { x: 100, y: 100 } });
const enemy = new Enemy({ position: { x: 500, y: 100 } });
const game = new Game({ player, enemy });

export { player, game, enemy };
