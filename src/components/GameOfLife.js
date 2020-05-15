import React from 'react'

class GameOfLife extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            interval: null,
        }
    }

    makeBoard() {
        let arr = []
        const cols = 100
        const rows = 30

        for (let i = 0; i < rows; i++) {
            arr[i] = []
            for (let j = 0; j < cols; j++) {
                arr[i][j] = Math.floor(Math.random() * 2)
            }
        }

        return arr
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
                // Oherwise continue being dead
                return 0
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
        let nextG = []

        for (let i = 0; i < g.length; i++) {
            nextG[i] = []

            for (let j = 0; j < g[i].length; j++) {
                const cellScore = this.cellScore(g, i, j)
                const fCell = this.cellLife(g[i][j], cellScore)
                nextG[i][j] = fCell
            }
        }

        return nextG
    }

    componentDidMount() {
        this.setState({ board: this.makeBoard() })

        const interval = setInterval(() => {
            const nextGrid = this.nextFrame(this.state.board)
            this.setState({ board: nextGrid })
        }, 500)
    }

    render() {
        return (
            <div className="game-of-life">
                {this.state.board.map((r, i) => {
                    return (
                        <span className="row" key={`r-${i}`}>
                            {r.map((c, j) => {
                                return `${c}`
                            })}
                        </span>
                    )
                })}
            </div>
        )
    }
}

export default GameOfLife
