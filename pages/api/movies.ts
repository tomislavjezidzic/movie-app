import { NextApiRequest, NextApiResponse } from 'next';
import { getMostWatched, getQueriedMovies } from '@libs/movieClient';
import slugify from 'slugify';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const page = JSON.parse(req.body).page;
        const searchQuery = JSON.parse(req.body).searchQuery;
        const genre = JSON.parse(req.body).genre;
        const year = JSON.parse(req.body).year;
        const score = JSON.parse(req.body).score;
        let results = [];

        if (genre || year || score) {
            const data = await getMostWatched(genre, year, score, page ? page : 1);
            if (data) {
                results = data?.data?.results;
            } else {
                results = [];
            }
        } else if (page) {
            const data = await getMostWatched(null, null, null, page);

            if (data) {
                results = data?.data?.results;
            } else {
                results = [];
            }
        } else if (searchQuery) {
            const data = await getQueriedMovies(searchQuery);
            if (data) {
                const allResults = data?.data?.results || [];

                results = allResults?.slice(0, 5);
            } else {
                results = [];
            }
        }

        const remappedResults = results.map((item: any) => {
            return {
                image: {
                    src: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w300${item.poster_path}`,
                    alt: item.title,
                },
                title: item.title,
                score: parseFloat(item.vote_average).toFixed(2),
                slug: `${item.id}-${slugify(item.title, {
                    strict: true,
                }).toLowerCase()}`,
                id: item.id,
            };
        });

        res.status(200).json({ remappedResults });
    }
};

export default handler;
