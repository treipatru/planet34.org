import { animate } from 'popmotion';

export default class BackgroundAnimator {
  constructor(divId, squareSize, animationDuration) {
    this.colors = {
        on: ['#98C379', '#61AFEF'],
        off: '#282C34',
    }

    const defaultState = []
    const containerEl = document.getElementById(divId);
    const rows = Math.floor(containerEl.offsetHeight / squareSize)
    const cols = Math.floor(containerEl.offsetWidth / squareSize)

    for (let i = 0; i < rows; i += 1) {
      defaultState.push([]);

      const row = document.createElement('div');
      row.classList.add('row');
      row.id = `r${i}`;
      containerEl.appendChild(row);
      const rowEl = document.getElementById(`r${i}`);

      for (let j = 0; j < cols; j += 1) {
        const colId = `c${i}${j}`;

        const col = document.createElement('div');
        col.classList.add('col');
        col.id = colId;
        col.style.backgroundColor = this.colors.off;
        col.style.width = `${squareSize}px`;
        col.style.height = `${squareSize}px`;

        rowEl.appendChild(col);

        defaultState[i].push({
          selector: document.getElementById(colId),
          isAlive: false,
        });
      }
    }

    this.animationDuration = animationDuration
    this.state = [...defaultState]
  }

  getRandomDeadCell = () => {
    const { state } = this;
    const coordinates = [
      Math.floor(Math.random() * state.length),
      Math.floor(Math.random() * state[0].length)
    ]
    const col = state[coordinates[0]][coordinates[1]];

    if (col.isAlive) {
      this.getRandomDeadCell();
    }

    state[coordinates[0]][coordinates[1]].isAlive = true
    return col;
  }

  animateCell = state => {
    const { animationDuration, colors, getRandomDeadCell } = this
    const cell = getRandomDeadCell();

    // Random but min a 3rd of duration
    const duration = Math.floor((Math.random() * animationDuration) + animationDuration / 3);

    animate({
      from: cell.selector.style.backgroundColor,
      to: colors.on[Math.floor(Math.random() * colors.on.length)],
      duration: duration,
      onUpdate: (latest) => {
        cell.selector.style.backgroundColor = latest;
      },
      onComplete: () => {
        cell.isAlive = false
      },
      repeat: 1,
      repeatType: 'reverse',
    });
  }
}
