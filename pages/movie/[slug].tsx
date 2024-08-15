import { GetStaticPaths, GetStaticProps } from 'next';
import { getMovie } from '@libs/movieClient';
import Image from 'next/image';

export interface SingleMoviePageProps {
    cover_image: string;
    poster_image: string;
    title: string;
    score: string;
}

const SingleMoviePage = ({ cover_image, poster_image, title, score }: SingleMoviePageProps) => {
    return (
        <>
            <Image src={cover_image} alt={title} width={1400} height={600} />
            <Image src={poster_image} alt={title} width={200} height={300} />
            <h1>
                {title} - {score}
            </h1>
        </>
    );
};

export const getStaticProps = async ({ params }) => {
    const movieId = params?.slug?.split('-')[0];
    const responseData = await getMovie(movieId);

    if (responseData && responseData.data) {
        const data = responseData.data;

        // Use the data variable here
        return {
            props: {
                slug: params?.slug,
                title: data.title,
                score: data.vote_average,
                cover_image: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/original${data.backdrop_path}`,
                poster_image: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w300${data.poster_path}`,
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
