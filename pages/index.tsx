import { GetStaticProps } from 'next';
import Header from '@organisms/layout/Header';
import MoviesScrollableRow from '@organisms/MoviesScrollableRow';
import MoviesRow from '@organisms/MoviesRow';
import { MovieCardProps } from '@molecules/MovieCard';
import slugify from 'slugify';
import { getMostWatched, getNewest, getTopRated } from '@libs/movieClient';
import { MovieCardPropsResponse } from 'types/interfaces';
import { AxiosResponse } from 'axios';

interface HomepageProps {
    newest: MovieCardProps[];
    popularAction: MovieCardProps[];
    popularAnimation: MovieCardProps[];
    top: MovieCardProps[];
}

const IndexPage = ({ newest, top, popularAnimation, popularAction }: HomepageProps) => {
    return (
        <>
            <Header title="Movie App Homepage" centered />

            <MoviesRow title="Newest" items={newest} lazyLoad={false} />

            <MoviesRow title="Top Rated" items={top} />

            <MoviesScrollableRow title="Popular Animation" items={popularAnimation} />

            <MoviesScrollableRow title="Popular Action" items={popularAction} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const newestResponse = await getNewest();

    const popularActionResponse = await getMostWatched(28, null, null, 1);

    const popularAnimationResponse = await getMostWatched(16, null, null, 1);

    const topResponse = await getTopRated();

    return {
        props: {
            title: 'Movie App Homepage',
            newest: (newestResponse as AxiosResponse<any, any>)?.data?.results
                ?.slice(0, 8)
                .map((item: MovieCardPropsResponse): MovieCardProps => {
                    return {
                        image: {
                            src: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w400${item.poster_path}`,
                            alt: item.title,
                        },
                        title: item.title,
                        score: parseFloat(item.vote_average).toFixed(2),
                        slug: `${item.id}-${slugify(item.title, {
                            strict: true,
                        }).toLowerCase()}`,
                        id: item.id,
                    };
                }),
            popularAction: (popularActionResponse as AxiosResponse<any, any>)?.data?.results
                ?.slice(0, 10)
                .map((item: MovieCardPropsResponse): MovieCardProps => {
                    return {
                        image: {
                            src: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w200${item.poster_path}`,
                            alt: item.title,
                        },
                        title: item.title,
                        score: parseFloat(item.vote_average).toFixed(2),
                        slug: `${item.id}-${slugify(item.title, {
                            strict: true,
                        }).toLowerCase()}`,
                        id: item.id,
                    };
                }),
            popularAnimation: (popularAnimationResponse as AxiosResponse<any, any>)?.data?.results
                ?.slice(0, 10)
                .map((item: MovieCardPropsResponse): MovieCardProps => {
                    return {
                        image: {
                            src: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w200${item.poster_path}`,
                            alt: item.title,
                        },
                        title: item.title,
                        score: parseFloat(item.vote_average).toFixed(2),
                        slug: `${item.id}-${slugify(item.title, {
                            strict: true,
                        }).toLowerCase()}`,
                        id: item.id,
                    };
                }),
            top: (topResponse as AxiosResponse<any, any>)?.data?.results
                ?.slice(0, 3)
                .map((item: MovieCardPropsResponse): MovieCardProps => {
                    return {
                        image: {
                            src: `${process.env.TMDB_IMAGES_BASE_URL_ENDPOINT}/w400${item.poster_path}`,
                            alt: item.title,
                        },
                        title: item.title,
                        score: parseFloat(item.vote_average).toFixed(2),
                        slug: `${item.id}-${slugify(item.title, {
                            strict: true,
                        }).toLowerCase()}`,
                        id: item.id,
                    };
                }),
        },
        revalidate: 3600,
    };
};

export default IndexPage;
