import { GetStaticPaths, GetStaticProps } from 'next';
import { getMovie } from '@libs/movieClient';
import Image from 'next/image';
const SingleMoviePage = params => {
    return (
        <>
            <Image src={params.cover_image} alt={params.title} width={1400} height={600} />
            <Image src={params.poster_image} alt={params.title} width={200} height={300} />
            <h1>
                {params.title} - {params.score}
            </h1>
        </>
    );
};

// @ts-ignore
export const getStaticProps: GetStaticProps = async ({ params }) => {
    // @ts-ignore
    const movieId = params?.slug?.split('-');
    const responseData = await getMovie(movieId);

    // @ts-ignore
    const data = responseData?.data;

    if (!responseData) {
        return {
            redirect: {
                destination: '/404',
            },
        };
    }

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
};

export const getStaticPaths: GetStaticPaths = async context => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default SingleMoviePage;
