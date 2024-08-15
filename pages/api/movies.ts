import { NextApiRequest, NextApiResponse } from 'next';
import getMostWatched from '@libs/movieClient';
import slugify from 'slugify';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const page = JSON.parse(req.body).page;
        const data = await getMostWatched(page);

        const results = data?.data?.results || '';

        const remappedResults = results.map((item: any) => {
            return {
                image: {
                    src: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w300${item.poster_path}`,
                    alt: item.title,
                },
                title: item.title,
                score: parseFloat(item.vote_average).toFixed(2),
                url: slugify(item.title, {
                    strict: true,
                }).toLowerCase(),
                id: item.id,
            };
        });

        res.status(200).json({ remappedResults });
    }
};

export default handler;
