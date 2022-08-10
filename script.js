import { populateGrid, drawGrid } from "./modules/setup.js";
import { Input } from "./modules/input.js";

window.addEventListener("load", () => {
  new Input();
  populateGrid();
  drawGrid();
});
