import { GetStaticProps } from 'next';
import { MovieCardProps } from '@molecules/MovieCard';
import axios from 'axios';
import slugify from 'slugify';
import MovieList from '@organisms/MovieList';
import Header from '@organisms/layout/Header';
import Footer from '@organisms/layout/Footer';

const MostWatchedPage = (data: { results: any }) => {
    return (
        <>
            <Header title="Most Watched" />

            <MovieList items={data.results} />

            <Footer />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const data = await axios.get(
        `${process.env.TMDB_BASE_URL_ENDPOINT}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_API_AUTHORIZATION,
            },
        }
    );

    type GetDataResponse = {
        poster_path: string;
        title: string;
        vote_average: string;
        id: string;
    };

    return {
        props: {
            results: data?.data?.results?.map((item: GetDataResponse): MovieCardProps => {
                return {
                    image: {
                        src: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w200${item.poster_path}`,
                        alt: item.title,
                    },
                    title: item.title,
                    score: parseFloat(item.vote_average).toFixed(2),
                    url: slugify(item.title).toLowerCase(),
                    id: item.id,
                };
            }),
        },
        revalidate: 10,
    };
};

export default MostWatchedPage;
