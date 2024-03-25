const tiles = [];

const TILE_COUNT = 10;
const LAYERS = 3;

const body = document.querySelector('body');

const tileRetrieverElement = document.createElement('div');

/**
 *
 * @param {number} min
 * @param {number} value
 * @param {number} max
 * @returns number
 */
const clamp = (min, value, max) => {
  return value <= min ? min : value >= max ? max : value;
};

/**
 *
 * @param {MouseEvent} event
 */
async function tileElementListener(event) {
  if (tiles.length >= 8) return;

  const { left, top } = tileRetrieverElement.getBoundingClientRect();
  event.target.style.top = `${top + 10}px`;
  event.target.style.left = `${10 + left + 110 * tiles.length}px`;
  tiles.push(1);
  await new Promise((res) => setTimeout(res, 1000));
  event.target.style.position = 'static';
  tileRetrieverElement.appendChild(event.target);
}

/**
 * used to initialize the tiles before rendering the scene
 */
const renderInitialTiles = () => {
  for (let i = 0; i <= TILE_COUNT; i++) {
    const tileElement = document.createElement('div');
    tileElement.classList.add('tile');

    // TOP VALUE
    const topRand = Math.random() * 100;
    const topRand2 = Math.random() * 2;

    const topClamp = clamp(
      body.clientHeight / 4,
      body.clientHeight / topRand,
      body.clientHeight / 2
    );

    tileElement.style.top = `${topClamp * topRand2}px`;

    // LEFT VALUE
    const leftRand = Math.random() * 100;
    const leftRand2 = Math.random() * 2;

    const leftClamp = clamp(
      body.clientWidth / 4,
      body.clientWidth / leftRand,
      body.clientWidth / 2
    );

    tileElement.style.left = `${leftClamp * leftRand2}px`;

    // BACKGROUND

    tileElement.style.background = `rgb(255, ${255 - Math.floor(topRand)}, ${
      255 - Math.floor(topRand)
    })`;

    tileElement.addEventListener('click', tileElementListener);

    tileRetrieverElement.classList.add('tileRetriever');

    body.appendChild(tileElement);
    body.appendChild(tileRetrieverElement);
  }
};

window.addEventListener('load', () => {
  console.log('lalalal');
  renderInitialTiles();
});
