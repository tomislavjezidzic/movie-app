import { GetStaticProps } from 'next';
import { MovieCardProps } from '@molecules/MovieCard';
import slugify from 'slugify';
import MovieList from '@organisms/MovieList';
import Header from '@organisms/layout/Header';
import { useCallback, useEffect, useState } from 'react';
import { MovieCardPropsResponse } from 'types/interfaces';
import { getMostWatched } from '@libs/movieClient';
import { useIntersectionObserverRef } from '@hooks/useIntersectionObserverRef';
import { AxiosResponse } from 'axios';
import Filters from 'components/organisms/Filters';
import LoadingIndicator from '@atoms/LoadingIndicator';

const MostWatchedPage = (initialData: { results: any }) => {
    const [page, setPage] = useState(2);
    const [data, setData] = useState(initialData.results);
    const [isLoading, setIsLoading] = useState(false);
    const [isFiltersLoading, setIsFiltersLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [score, setScore] = useState(null);
    const [year, setYear] = useState(null);
    const [needsLoadMore, setNeedsLoadMore] = useState(true);

    const makeApiCall = useCallback(
        async (genre?: number, year?: number, score?: number, passedPage?: number) => {
            return await fetch('/api/movies', {
                method: 'POST',
                body: JSON.stringify({
                    genre: genre,
                    year: year,
                    score: score,
                    page: passedPage ? passedPage : page,
                }),
            });
        },
        [page]
    );

    const loadMore = useCallback(() => {
        setIsLoading(true);

        makeApiCall(genre, year, score).then(response => {
            response.json().then(newData => {
                setNeedsLoadMore(newData.needsLoadMore);
                setData([...data, ...newData.remappedResults]);
                setPage(p => p + 1);
                setIsLoading(false);
            });
        });
    }, [makeApiCall, genre, year, score, data]);

    const callback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (entries[0].intersectionRatio === 1 && !isLoading && needsLoadMore) {
                loadMore();
            }
        },
        [isLoading, needsLoadMore, loadMore]
    );

    const [loadMoreRef] = useIntersectionObserverRef(callback);

    useEffect(() => {
        setIsFiltersLoading(true);
        makeApiCall(genre, year, score, 1).then(response => {
            response.json().then(newData => {
                setNeedsLoadMore(newData.needsLoadMore);
                setData([...newData.remappedResults]);
                setPage(2);
                setIsFiltersLoading(false);
            });
        });
    }, [genre, year, score]);

    return (
        <>
            <Header title="Most Watched" />

            <Filters setGenre={setGenre} setScore={setScore} setYear={setYear} />

            <MovieList items={data} isLoading={isLoading} isFiltersLoading={isFiltersLoading} />

            <div ref={loadMoreRef}>
                {needsLoadMore && (
                    <div className="o-container">
                        <LoadingIndicator centered />
                    </div>
                )}
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const data = await getMostWatched(null, null, null, 1);

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
