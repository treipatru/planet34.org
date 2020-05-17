import React from 'react'
import Description from './components/Description'
import GameOfLife from './components/GameOfLife'
import debounce from './utils/debounce'

function App() {
    const [viewSize, setViewSize] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const backElements = [GameOfLife]
    const renderEl = backElements[Math.floor(Math.random() * backElements.length)]

    React.useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setViewSize({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        }, 1000)

        window.addEventListener('resize', debouncedHandleResize)

        return (_) => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    })

    return (
        <div className="App">
            {React.createElement(renderEl, { viewSize })}
            <Description />
        </div>
    )
}

export default App
