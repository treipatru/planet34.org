import React from 'react'

class GameOfLife extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            cols: 0,
            rows: 0,
            iteration: 0,
        }
    }

    generateBoard(cols, rows) {
        let arr = []

        for (let i = 0; i < rows; i++) {
            arr[i] = []
            for (let j = 0; j < cols; j++) {
                arr[i][j] = this.randomCellLife(5)
            }
        }

        return arr
    }

    randomCellLife(percent) {
        const chance = Math.floor(Math.random() * 100)
        return chance < percent ? Math.floor(Math.random() * 2) : 0
    }

    cellLife(isAlive, score) {
        if (isAlive) {
            if (score < 2) {
                // Any live cell with fewer than two live neighbors dies
                return 0
            } else if (score > 1 && score < 4) {
                // Any live cell with two or three live neighbors lives on to the next generation.
                return 1
            } else if (score > 3) {
                // Any live cell with more than three live neighbors dies, as if by overpopulation.
                return 0
            }
        } else {
            // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            if (score === 3) {
                return 1
            } else {
                if (this.state.iteration % 5 === 0) {
                    // At some point inject new alive cells
                    return this.randomCellLife(2)
                } else {
                    // Continue being dead in normal flow
                    return 0
                }
            }
        }
    }

    cellScore(g, r, c) {
        let score = 0
        // Previous row
        if (g[r - 1]) {
            g[r - 1].slice(c - 1, c + 2).forEach((i) => {
                score += parseInt(i, 10)
            })
        }
        // Current
        g[r].slice(c - 1, c + 2).forEach((i) => {
            score += parseInt(i, 10)
        })
        // Previous row
        if (g[r + 1]) {
            g[r + 1].slice(c - 1, c + 2).forEach((i) => {
                score += parseInt(i, 10)
            })
        }
        return score
    }

    nextFrame(g) {
        let next = []

        for (let i = 0; i < g.length; i++) {
            next[i] = []

            for (let j = 0; j < g[i].length; j++) {
                const cellScore = this.cellScore(g, i, j)
                const fCell = this.cellLife(g[i][j], cellScore)
                next[i][j] = fCell
            }
        }

        return next
    }

    componentDidMount() {
        // Init first iteration board
        const testChar = document.getElementById('test-char')
        const cols = () => {
            const w = document.getElementById('game-of-life').offsetWidth
            return Math.floor(w / testChar.offsetWidth)
        }

        const rows = () => {
            const h = document.getElementById('game-of-life').offsetHeight
            return Math.floor(h / testChar.offsetHeight + 1)
        }

        this.setState({ board: this.generateBoard(cols(), rows()) })

        // Run simulation
        setInterval(() => {
            this.setState({ board: this.nextFrame(this.state.board) })
            this.setState({ iteration: this.state.iteration + 1 })
        }, 1000)
    }

    render() {
        return (
            <div id="game-of-life">
                <span id="test-char">░</span>

                {this.state.board.map((r, i) => {
                    return (
                        <div className="row" key={`r-${i}`}>
                            {r.map((c, j) => {
                                return (
                                    <span
                                        key={`c-${j}`}
                                        className={c ? 'alive' : ''}
                                    >
                                        {c ? '█' : '░'}
                                    </span>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default GameOfLife
