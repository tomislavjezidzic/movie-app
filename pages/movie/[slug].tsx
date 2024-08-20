import { GetStaticPaths } from 'next';
import { getMovie } from '@libs/movieClient';
import SingleMovieHeader from '@organisms/layout/SingleMovieHeader';
import SingleMovieBody from '@organisms/SingleMovieBody';
import Marquee from '@organisms/Marquee';

export interface SingleMoviePageProps {
    coverImage: string;
    posterImage: string;
    title: string;
    score: string;
    description: string;
    genres: string[];
    duration: number;
    country: string[];
    cast: string[];
    id: string;
}

const SingleMoviePage = ({
    coverImage,
    posterImage,
    title,
    description,
    score,
    genres,
    duration,
    country,
    cast,
    id
}: SingleMoviePageProps) => {
    return (
        <>
            <SingleMovieHeader
                posterImage={posterImage}
                coverImage={coverImage}
                title={title}
                score={score}
                id={id}
            />

            <Marquee content={genres} />

            <SingleMovieBody
                description={description}
                duration={duration}
                country={country}
                cast={cast}
            />
        </>
    );
};

export const getStaticProps = async ({ params }) => {
    const movieId = params?.slug?.split('-')[0];
    const responseData = await getMovie(movieId);

    if (responseData && responseData.data) {
        const data = responseData.data;

        return {
            props: {
                coverImage: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/original${data.backdrop_path}`,
                posterImage: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w300${data.poster_path}`,
                title: data.title,
                description: data.overview,
                score: parseFloat(data.vote_average).toFixed(2),
                genres: data.genres.map((item: { name: string }) => item.name),
                duration: data.runtime,
                country: data.origin_country,
                id: data.id,
                cast: data.credits.cast.map((item: { name: string }) => item.name),
            },
            revalidate: 3600,
        };
    } else {
        return {
            redirect: {
                destination: '/404',
            },
        };
    }
};

export const getStaticPaths: GetStaticPaths = async context => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default SingleMoviePage;
