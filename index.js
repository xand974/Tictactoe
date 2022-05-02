import { GameManager } from "./scripts/game.js";
import { ctx } from "./scripts/canvas.js";
GameManager.Instance.initGame(ctx);
GameManager.Instance.animate();
