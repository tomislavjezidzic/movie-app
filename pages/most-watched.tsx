'use client';
import { GetStaticProps } from 'next';
import { MovieCardProps } from '@molecules/MovieCard';
import slugify from 'slugify';
import MovieList from '@organisms/MovieList';
import Header from '@organisms/layout/Header';
import Footer from '@organisms/layout/Footer';
import { useCallback, useState } from 'react';
import getMostWatched from '@libs/movieClient';
import { MovieCardPropsResponse } from 'types/interfaces';

const MostWatchedPage = (initialData: { results: any }) => {
    const [page, setPage] = useState(2);
    const [data, setData] = useState(initialData.results);

    const makeApiCall = async () => {
        return await fetch('/api/movies', {
            method: 'POST',
            body: JSON.stringify({ page: page }),
        });
    };

    const handleClick = useCallback(() => {
        makeApiCall().then(r => {
            r.json().then(newData => {
                console.log(newData.remappedResults);

                setPage(p => p + 1);
                setData([...data, ...newData.remappedResults]);
            });
        });
    }, [makeApiCall]);

    return (
        <>
            <Header title="Most Watched" />

            <button onClick={() => handleClick()}>load more</button>

            <MovieList items={data} />

            <Footer />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const data = await getMostWatched(1);

    return {
        props: {
            results: data?.data?.results?.map((item: MovieCardPropsResponse): MovieCardProps => {
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
            }),
        },
        revalidate: 3600,
    };
};

export default MostWatchedPage;
