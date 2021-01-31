class GoL {
    containerEl
    dataFrame
    frameSize
    squareSize
    timer
    transitionDuration

    constructor (divId, squareSize, transitionDuration) {
        this.containerEl = document.getElementById(divId)

        this.squareSize = squareSize
        this.frameSize= {
            h: Math.floor(this.containerEl.offsetHeight / this.squareSize),
            w: Math.floor(this.containerEl.offsetWidth / this.squareSize)
        }
        this.transitionDuration = transitionDuration

        this.firstFrame()
    }

    firstFrame () {
        const {
            frameSize: { h },
            frameSize: { w },
            squareSize,
            transitionDuration
        } = this

        let frame = Array(h + 1).fill(
            Array(w).fill({ el: null, isOn: false })
        )

        for (let i in frame) {
            let row = document.createElement('div')
            row.classList.add('row')
            row.id = `r${i}`

            for (let j in frame[i]) {
                let col = document.createElement('div')
                const isOn = Math.random() < 0.5

                col.classList.add('col')
                if (isOn) col.classList.add('on')
                col.id = `${i}-${j}`

                col.style.width = `${squareSize}px`
                col.style.height = `${squareSize}px`

                // const delay = Math.floor(Math.random() * (transitionDuration - 250) + 250)
                const delay = i * 200 + j * 50
                col.style.transitionDelay = `${delay}ms` 

                row.appendChild(col)
                frame[i][j].isOn = isOn
            }

            this.containerEl.appendChild(row)
        }

        this.dataFrame = frame.map((r, i) => {
            return r.map((c, j) => {
                return {
                    el: document.getElementById(`${i}-${j}`),
                    isOn: c.isOn
                }
            })
        })
    }

    getNextCellState (frame, row, col) {
        const score = this.getCellScore (frame, row, col)

        if (score < 20) {
            return false
        } else if (score >= 20 && score < 80) {
            return true
        } else if (score > 80) {
            return false
        }
    }

    getCellScore (frame, row, col) {
        let score = 0

        // Previous row
        if (frame[row - 1]) {
            frame[row - 1].slice(col - 1, col + 2).forEach(cell => {
                if (cell.isOn) score += 10
            })
        }

        // Current row
        frame[row].slice(col - 1, col + 2).forEach(cell => {
            if (cell.isOn) score += 10
        })

        // Next row
        if (frame[row + 1]) {
            frame[row + 1].slice(col - 1, col + 2).forEach(cell => {
                if (cell.isOn) score += 10
            })
        }

        return score
    }

    animateNextFrame () {
        const { dataFrame } = this
        let nextFrame = [...dataFrame]

        for (let i in dataFrame) {
            for (let j in dataFrame[i]) {
                const prevAlive = dataFrame[i][j].isOn
                const nextAlive = this.getNextCellState(dataFrame, i, j)

                nextFrame[i][j].isOn = nextAlive

                if (prevAlive && !nextAlive || !prevAlive && nextAlive){
                    nextFrame[i][j].el.classList.toggle('on')
                }
            }
        }
        this.dataFrame = [...nextFrame]
    }

    start () {
        this.timer = setInterval(() => {
            this.animateNextFrame()
        }, this.transitionDuration)
    }

    stop () {
        clearInterval(this.timer)
    }
}

let backBoard = new GoL('backg', 100, 5000)
backBoard.start()
