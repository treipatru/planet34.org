import React from 'react'

const Description = () => {
    const hellos = ['marhaba', 'bonjour', 'salve', 'salut', 'hola', 'namaste']
    const greeting = hellos[Math.floor(Math.random() * hellos.length)]

    return (
        <section className="description">
            <h1>{greeting}</h1>
            <p>
                I'm Andrei, a Frontend developer and systems nerd. I work on web apps
                trying to make interesting, interactive experience for people. A long
                time ago I used to work in{' '}
                <a
                    href="https://github.com/treipatru/games"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    video games
                </a>
                .
            </p>
            <p>
                Sometimes I post photos on{' '}
                <a
                    href="https://revelator.planet34.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    revelator
                </a>
                , or repost on{' '}
                <a
                    href="https://twitter.com/treipatru"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    twitter
                </a>
                . I try to open source my projects and they usually end up in my{' '}
                <a
                    href="https://github.com/treipatru"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    github
                </a>
                .
            </p>
            <p>
                If you are interested in working together or just want to say{' '}
                {greeting} just send me an e-mail at{' '}
                <a href="mailto:andrei@planet34.org">andrei@planet34.org</a>.
            </p>
        </section>
    )
}

Description.displayName = 'Description'

export default Description
