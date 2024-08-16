import { GetStaticProps } from 'next';
import { MovieCardProps } from '@molecules/MovieCard';
import slugify from 'slugify';
import MovieList from '@organisms/MovieList';
import Header from '@organisms/layout/Header';
import { useCallback, useState } from 'react';
import { MovieCardPropsResponse } from 'types/interfaces';
import { getMostWatched } from '@libs/movieClient';
import { useIntersectionObserverRef } from '@hooks/useIntersectionObserverRef';
import { AxiosResponse } from 'axios';

const MostWatchedPage = (initialData: { results: any }) => {
    const [page, setPage] = useState(2);
    const [data, setData] = useState(initialData.results);
    const [isLoading, setIsLoading] = useState(false);

    const callback = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].intersectionRatio === 1 && !isLoading) {
            loadMore();
        }
    };

    const [loadMoreRef] = useIntersectionObserverRef(callback);

    const makeApiCall = async () => {
        return await fetch('/api/movies', {
            method: 'POST',
            body: JSON.stringify({ page: page }),
        });
    };

    const loadMore = useCallback(() => {
        setIsLoading(true);

        makeApiCall().then(response => {
            response.json().then(newData => {
                setData([...data, ...newData.remappedResults]);
                setPage(p => p + 1);
                setIsLoading(false);
            });
        });
    }, [makeApiCall]);

    return (
        <>
            <Header title="Most Watched" />

            <MovieList items={data} isLoading={isLoading} />

            <div ref={loadMoreRef} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const data = await getMostWatched(1);

    return {
        props: {
            title: 'Most Watched',
            results: (data as AxiosResponse<any, any>)?.data?.results?.map(
                (item: MovieCardPropsResponse): MovieCardProps => {
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
                }
            ),
        },
        revalidate: 3600,
    };
};

export default MostWatchedPage;
