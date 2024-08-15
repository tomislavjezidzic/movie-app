const modules = {
    sassOptions: {
        additionalData: `@import "scss/_scoped";`,
    },
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    images: {
        domains: ['picsum.photos', 'image.tmdb.org'],
    },
    async redirects() {
        return [
            {
                source: '/movie',
                destination: '/most-watched',
                permanent: true,
            },
        ];
    },
};

module.exports = modules;
