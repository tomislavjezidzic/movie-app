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
        let needsLoadMore = true;
        let totalResults = null;

        if (searchQuery) {
            const data = await getQueriedMovies(searchQuery, page);
            if (data) {
                const allResults = data?.data?.results || [];
                needsLoadMore = data?.data?.page < data?.data?.total_pages;
                totalResults = data?.data?.total_results;

                results = !page ? allResults?.slice(0, 5) : allResults;
            } else {
                results = [];
            }
        } else if (page) {
            const data = await getMostWatched(genre, year, score, page ? page : 1);
            if (data) {
                results = await data?.data?.results;
                needsLoadMore = data?.data?.page < data?.data?.total_pages;
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

        res.status(200).json({ remappedResults, needsLoadMore, totalResults });
    }
};

export default handler;
