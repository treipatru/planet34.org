module.exports = {
    siteMetadata: {
        title: `Planet34`,
    },
    plugins: [
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [`DM Mono\:400,500`, `Ubuntu Mono`],
                display: 'swap',
            },
        },
    ],
}
