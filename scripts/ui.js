const pmText = document.querySelector('#PM-text');
const paText = document.querySelector('#PA-text');
const lifeText = document.querySelector('#life-text');
const container = document.querySelector('#board');

export class UI {
  constructor() {
    container.addEventListener('dragstart', this.handleDragStart.bind(this));
    container.addEventListener('dragover', this.handleDragOver.bind(this));
  }

  handleDragStart(e) {}

  handleDragOver(e) {
    e.preventDefault();

    e.target.style.transform = `translate(${e.x}px , ${e.y}px)`;
  }
}
