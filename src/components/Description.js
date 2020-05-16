import React from 'react'

const Description = () => {
    const hellos = ['marhaba', 'bonjour', 'salve', 'salut', 'hola', 'namaste']
    const greeting = hellos[Math.floor(Math.random() * hellos.length)]

    return (
        <section className="description">
            <h1>{greeting}</h1>
            <p>
                I'm Andrei, a Frontend developer and systems nerd. I work on web apps
                trying to make interesting, interactive experiences for people.
            </p>
            <p>
                Sometimes I post photos on{' '}
                <a
                    href="https://revelator.planet34.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    revelator
                </a>{' '}
                or repost on{' '}
                <a
                    href="https://twitter.com/treipatru"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    twitter
                </a>
                . Some of my projects are on{' '}
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
                {greeting} send me an <a href="mailto:andrei@planet34.org">e-mail</a>
                .
            </p>
        </section>
    )
}

Description.displayName = 'Description'

export default Description
