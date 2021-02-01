import { animate } from 'popmotion';

const colors = {
  on: ['#98C379', '#61AFEF'],
  off: '#282C34',
};

export default class GoL {
  constructor(divId, squareSize, frameDuration) {
    this.containerEl = document.getElementById(divId);

    this.gridSize = [
      Math.floor(this.containerEl.offsetHeight / squareSize),
      Math.floor(this.containerEl.offsetWidth / squareSize),
    ];

    this.squareSize = squareSize;

    this.frameDuration = frameDuration;

    this.dataFrame = [];
    this.timer = null;

    this.setup();
  }

  setup() {
    const { containerEl, gridSize, squareSize } = this;
    const newFrame = [];

    for (let i = 0; i < gridSize[0]; i += 1) {
      // Create row html
      const row = document.createElement('div');
      row.classList.add('row');
      row.id = `r${i}`;
      containerEl.appendChild(row);
      const rowEl = document.getElementById(`r${i}`);

      // Create row data
      newFrame.push([]);

      for (let j = 0; j < gridSize[1]; j += 1) {
        const colId = `c${i}${j}`;

        // Create col html
        const col = document.createElement('div');
        col.classList.add('col');
        col.id = colId;
        col.style.backgroundColor = colors.off;
        col.style.width = `${squareSize}px`;
        col.style.height = `${squareSize}px`;
        rowEl.appendChild(col);

        // Create col data
        newFrame[i].push({
          selector: document.getElementById(colId),
          isAlive: Math.random() < 0.5,
        });
      }
    }
    this.dataFrame = [...newFrame];
  }

  static isCellAlive(score) {
    if (score >= 20 && score < 80) {
      return true;
    }

    return false;
  }

  /*
   * Return the sum of an arbitrary value for each isAlive value found before
   * and after the col index of a given arr
  */
  static aliveAround(arr, col) {
    const onValue = 10;

    return arr.slice(col - 1, col + 2)
      .reduce((sum, cell) => (sum + cell.isAlive ? onValue : 0), 0);
  }

  static isAliveInNextFrame(dataFrame, row, col) {
    const { aliveAround, isCellAlive } = this.prototype.constructor;
    let score = 0;

    // Add previous row if exists
    if (row[row - 1]) score += aliveAround(dataFrame[row - 1], col);
    // Current row
    score += aliveAround(dataFrame[row], col);
    // And finally next row
    if (row[row + 1]) score += aliveAround(dataFrame[row + 1], col);

    return isCellAlive(score);
  }

  animateNextFrame() {
    const { dataFrame, frameDuration } = this;
    const nextFrame = [...dataFrame];

    for (let i = 0; i < dataFrame.length; i += 1) {
      for (let j = 0; j < dataFrame[i].length; j += 1) {
        const { isAlive } = dataFrame[i][j];
        const isAliveNext = this.constructor.isAliveInNextFrame(dataFrame, i, j);
        nextFrame[i][j].isAlive = isAliveNext;

        if (isAlive !== isAliveNext) {
          const colEl = nextFrame[i][j].selector;
          // Animation delay random but max half frameDuration
          const delay = Math.floor((Math.random() * frameDuration) + frameDuration / 2);
          // Animation duration remaining frameDuration
          const duration = frameDuration - delay;

          animate({
            from: isAlive ? colEl.style.backgroundColor : colors.off,
            to: colors.on[Math.floor(Math.random() * colors.on.length)],
            duration,
            elapsed: -delay,
            onUpdate: (latest) => {
              colEl.style.backgroundColor = latest;
            },
          });
        }
      }
    }

    this.dataFrame = [...nextFrame];
    console.log('Next frame');
    console.log(this.dataFrame[0][0].isAlive);
  }

  start() {
    this.timer = setInterval(() => {
      this.animateNextFrame();
    }, this.frameDuration);
  }

  stop() {
    clearInterval(this.timer);
  }
}
