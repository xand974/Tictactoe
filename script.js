const boxContainer = document.querySelector("#container");
const selections = [];
let word = "";
let inputWord = "";
let canGoNext = true;
let loose = false;
let count = 1;

async function getWords() {
  try {
    const res = await fetch("https://random-word-api.herokuapp.com/all");
    const list = (await res.json()) ?? [];
    const filtered = list.filter((item) => item.length === 5);
    setRandomWord(filtered);
  } catch (error) {
    throw error;
  }
}

function setRandomWord(words) {
  const random = Math.floor(Math.random() * words.length);
  const randomWord = words[random];
  word = randomWord;
}

function setBoxElement(id) {
  const rowElement = `<div class="row" id="row-${id}"></div>`;
  boxContainer.innerHTML += rowElement;
  const currentRow = document.querySelector(`#row-${id}`);
  for (let i = 0; i < 5; i++) {
    const cubeElement = `<div class="cube" id="cube-${i}"></div>`;
    currentRow.innerHTML += cubeElement;
  }
  return currentRow;
}

function populateBoxContainer() {
  for (let i = 0; i < 4; i++) {
    const box = setBoxElement(i);
    selections.push(box);
  }
}

function whichRow() {
  const res = selections.filter((item) => !item.hasAttribute("data-checked"));
  if (res.length === 0) return null;
  return res[0];
}

function whichCube(row) {
  const allCubesFromRow = row.querySelectorAll(".cube") ?? [];
  if (!allCubesFromRow) return;
  const cubesEntries = Object.values(allCubesFromRow);
  const filtered = cubesEntries.filter((item) => item.innerHTML === "");
  setCanGoNext(filtered.length - 1);
  return [filtered[0] ?? null, filtered.length];
}

function setPosition(row) {
  const id = row.getAttribute("id");
  for (let i = 1; i < selections.length + 1; i++) {
    if (id.includes(i)) {
      row.style.transform = `translateY(${140 * i}%)`;
    }
  }
}

function setCanGoNext(length, value) {
  canGoNext = value ? value : length === 0 ? false : true;
}

function setToCurrentSelection(key = "") {
  if (!key || !key.match(/^[A-Za-z]+$/) || key.length > 1) return;
  const row = whichRow();
  if (!row) {
    loose = true;
    return;
  }
  const [cube, filteredLength] = whichCube(row);
  if (!cube) return;
  cube.innerHTML += `<p class="key">${key.toLowerCase()}</p>`;
  row.classList.add("active");
  inputWord += key.toLowerCase();
  setPosition(row);
  if (filteredLength - 1 === 0) {
    row.setAttribute("data-checked", "true");
    return;
  }
  boxContainer.append(row);
}

function getCubesFromCurrentRow() {
  const row = whichRow();
  if (!row) return null;
  const cubesElement = row.querySelectorAll(".cube");
  return cubesElement ?? null;
}

function getPreviousRow() {
  const res = selections.filter((item) => item.hasAttribute("data-checked"));
  if (res.length === 0) return null;
  return res[res.length - 1];
}

function getPreviousListCubes() {
  const prevRow = getPreviousRow();
  const cubesFromPrev = prevRow.querySelectorAll(".cube");
  return Object.values(cubesFromPrev);
}

async function setAnimations() {
  const cubesList = getPreviousListCubes();

  for (const [index, letter] of inputWord.split("").entries()) {
    await new Promise((res) => setTimeout(res, 750));
    const selectedCube = cubesList[index];
    selectedCube.style.transition = "all 0.5s ease";
    selectedCube.style.transform = "rotateX(360deg)";
    if (!word.includes(letter)) continue;
    if (word.includes(letter) && word[index] === letter) {
      selectedCube.style.background = "green";
      continue;
    }
    selectedCube.style.background = "orange";
  }
  await new Promise((res) => setTimeout(res, 750));
}
function removeOneLetter() {
  // TODO refactor this
  if (inputWord.length === 5) {
    const row = getPreviousRow();
    if (!row) return;
    const cubesList = getPreviousListCubes();
    const lastCubes = cubesList.filter((item) => item.innerHTML !== "");
    const lastCube = lastCubes[cubesList.length - 1];
    removeInputLetter(lastCube);
    if (row.hasAttribute("data-checked")) row.removeAttribute("data-checked");
    setCanGoNext(null, true);
    return;
  }
  const cubesElement = getCubesFromCurrentRow();
  if (!cubesElement) return;
  const cubesList = Object.values(cubesElement);
  const filledCubes = cubesList.filter((item) => item.innerHTML !== "");
  if (filledCubes.length === 0) return;
  const lastCube = filledCubes[filledCubes.length - 1];
  removeInputLetter(lastCube);
  setCanGoNext(null, true);
}

function removeInputLetter(lastCube) {
  inputWord = inputWord.substring(0, inputWord.length - 1);
  lastCube.innerHTML = "";
}

function checkLoose() {
  const row = whichRow();
  loose = !row && inputWord !== word ? true : false;
}

function printWord(displayWord) {
  const element = document.createElement("div");
  element.classList.add("word");
  element.innerHTML += `<p class="word__text">${displayWord}</p>`;
  document.body.appendChild(element);
}

async function handleEnter() {
  if (inputWord.length < 5) return;

  await setAnimations();
  if (inputWord === word) {
    printWord("ouais mon gars");
    return;
  }
  checkLoose();
  if (loose) {
    printWord(word);
    return;
  }

  inputWord = "";
  canGoNext = true;
  count++;

  return;
}

function handleDefault() {}

function handleLoose() {
  window.removeEventListener("keydown", handleKeyDown);
}

async function handleKeyDown(e) {
  const key = e.key;
  if (loose) {
    handleLoose();
    return;
  }
  switch (key) {
    case "Backspace":
      removeOneLetter();
      return;
    case "Enter":
      await handleEnter();
      return;
    default:
      handleDefault();
      break;
  }
  if (!canGoNext) return;
  setToCurrentSelection(key);
}

window.addEventListener("keydown", handleKeyDown);

(async () => {
  await getWords();
})();
populateBoxContainer();
