import { GetStaticProps } from 'next';
import Header from '@organisms/layout/Header';
import Footer from '@organisms/layout/Footer';
import MoviesScrollableRow from '@organisms/MoviesScrollableRow';
import MoviesRow from '@organisms/MoviesRow';
import axios from 'axios';
import { MovieCardProps } from '@molecules/MovieCard';
import slugify from 'slugify';

const IndexPage = (data: { newest: any; popularAnimation: any; popularAction: any; top: any }) => {
    return (
        <>
            <Header title="Movie App Homepage" centered />

            <MoviesRow title="Newest" items={data.newest} />

            <MoviesRow title="Top Rated" items={data.top} />

            <MoviesScrollableRow title="Popular Animation" items={data.popularAnimation} />

            <MoviesScrollableRow title="Popular Action" items={data.popularAction} />

            <Footer />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const newestResponse = await axios.get(
        `${process.env.TMDB_BASE_URL_ENDPOINT}/movie/now_playing?language=en-US&page=1`,
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_API_AUTHORIZATION,
            },
        }
    );

    const popularActionResponse = await axios.get(
        `${process.env.TMDB_BASE_URL_ENDPOINT}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28`,
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_API_AUTHORIZATION,
            },
        }
    );

    const popularAnimationResponse = await axios.get(
        `${process.env.TMDB_BASE_URL_ENDPOINT}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16`,
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_API_AUTHORIZATION,
            },
        }
    );

    const topResponse = await axios.get(
        `${process.env.TMDB_BASE_URL_ENDPOINT}/movie/top_rated?language=en-US&page=1`,
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
            newest: newestResponse?.data?.results
                ?.slice(0, 8)
                .map((item: GetDataResponse): MovieCardProps => {
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
            popularAction: popularActionResponse?.data?.results
                ?.slice(0, 10)
                .map((item: GetDataResponse): MovieCardProps => {
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
            popularAnimation: popularAnimationResponse?.data?.results
                ?.slice(0, 10)
                .map((item: GetDataResponse): MovieCardProps => {
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
            top: topResponse?.data?.results
                ?.slice(0, 3)
                .map((item: GetDataResponse): MovieCardProps => {
                    return {
                        image: {
                            src: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w400${item.poster_path}`,
                            alt: item.title,
                        },
                        title: item.title,
                        score: parseFloat(item.vote_average).toFixed(2),
                        url: slugify(item.title).toLowerCase(),
                        id: item.id,
                    };
                }),
        },
        revalidate: 3600,
    };
};

export default IndexPage;
