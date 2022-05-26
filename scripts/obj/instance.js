import { Character } from "../classes/character.js";
import { Game } from "../classes/game.js";

const player = new Character({
  position: { x: 0, y: 0 },
  name: "player",
  color: "green",
  src: "../../assets/Ninja/Idle.png",
});
const enemy = new Character({
  position: { x: 50, y: 0 },
  name: "enemy",
  color: "red",
  src: "../../assets/Samurai/Idle.png",
});
const game = new Game({ player, enemy });

const playerUI = document.querySelector("#playerUI .current__health");
const enemyUI = document.querySelector("#enemyUI .current__health");
const timer = document.querySelector("#timer");

const gravity = 0.2;

export { player, game, enemy, gravity, playerUI, enemyUI, timer };
