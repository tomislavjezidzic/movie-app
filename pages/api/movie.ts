import { NextApiRequest, NextApiResponse } from 'next';
import { getMovie } from '@libs/movieClient';
import slugify from 'slugify';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const movieId = req.body.movieId;
        let result = null;

        if (movieId) {
            const data = await getMovie(movieId);
            if (data) {
                result = data?.data || null;
            }
        }

        res.status(200).json({
            image: {
                src: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w300${result?.poster_path}`,
                alt: result?.title,
            },
            title: result?.title,
            score: parseFloat(result?.vote_average).toFixed(2),
            slug: `${result?.id}-${slugify(result?.title, {
                strict: true,
            }).toLowerCase()}`,
            id: result?.id,
        });
    }
};

export default handler;
