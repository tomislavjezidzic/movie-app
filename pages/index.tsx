import { GetStaticProps } from 'next';
import Header from '@organisms/layout/Header';
import MoviesScrollableRow from '@organisms/MoviesScrollableRow';
import MoviesRow from '@organisms/MoviesRow';
import { MovieCardProps } from '@molecules/MovieCard';
import slugify from 'slugify';
import { getMoviesByGenre, getNewest, getTopRated } from '@libs/movieClient';
import { MovieCardPropsResponse } from 'types/interfaces';

const IndexPage = (data: { newest: any; popularAnimation: any; popularAction: any; top: any }) => {
    return (
        <>
            <Header title="Movie App Homepage" centered />

            <MoviesRow title="Newest" items={data.newest} lazyLoad={false} />

            <MoviesRow title="Top Rated" items={data.top} />

            <MoviesScrollableRow title="Popular Animation" items={data.popularAnimation} />

            <MoviesScrollableRow title="Popular Action" items={data.popularAction} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const newestResponse = await getNewest();

    const popularActionResponse = await getMoviesByGenre(28);

    const popularAnimationResponse = await getMoviesByGenre(16);

    const topResponse = await getTopRated();

    return {
        props: {
            title: 'Movie App Homepage',
            newest: newestResponse?.data?.results
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
            popularAction: popularActionResponse?.data?.results
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
            popularAnimation: popularAnimationResponse?.data?.results
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
            top: topResponse?.data?.results
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
