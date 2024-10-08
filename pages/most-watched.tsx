import { GetStaticProps } from 'next';
import { MovieCardProps } from '@molecules/MovieCard';
import slugify from 'slugify';
import MovieList from '@organisms/MovieList';
import Header from '@organisms/layout/Header';
import { useCallback, useEffect, useState } from 'react';
import { MovieCardPropsResponse } from 'types/interfaces';
import { getMostWatched } from '@libs/movieClient';
import { useIntersectionObserverRef } from '@hooks/useIntersectionObserverRef';
import axios, { AxiosResponse } from 'axios';
import Filters from 'components/organisms/Filters';
import LoadingIndicator from '@atoms/LoadingIndicator';

const MostWatchedPage = (initialData: { results: any }) => {
    const [page, setPage] = useState(2);
    const [data, setData] = useState(initialData.results);
    const [isLoading, setIsLoading] = useState(false);
    const [isFiltersLoading, setIsFiltersLoading] = useState(true);
    const [genre, setGenre] = useState(null);
    const [score, setScore] = useState(null);
    const [year, setYear] = useState(null);
    const [needsLoadMore, setNeedsLoadMore] = useState(true);

    const makeApiCall = useCallback(
        async (genre?: number, year?: number, score?: number, passedPage?: number) => {
            return await axios.post('/api/movies', {
                genre,
                year,
                score,
                page: passedPage ? passedPage : page,
            });
        },
        [page]
    );

    const loadMore = useCallback(() => {
        setIsLoading(true);

        makeApiCall(genre, year, score)
            .then(newData => {
                setNeedsLoadMore(newData.data.needsLoadMore);
                setData([...data, ...newData.data.remappedResults]);
                setPage(p => p + 1);
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch(err => console.log(`Load more error: ${err}`));
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

        makeApiCall(genre, year, score, 1)
            .then(newData => {
                setNeedsLoadMore(newData.data.needsLoadMore);
                setData([...newData.data.remappedResults]);
                setPage(2);
            })
            .finally(() => {
                setIsFiltersLoading(false);
            })
            .catch(err => console.log(`Filtering error: ${err}`));
    }, [genre, year, score]);

    return (
        <>
            <Header title="Most Watched" />

            <Filters setGenre={setGenre} setScore={setScore} setYear={setYear} />

            <MovieList items={data} isFiltersLoading={isFiltersLoading} />

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
    const results = (data as AxiosResponse<any, any>)?.data?.results;

    return {
        props: {
            title: 'Most Watched',
            results: !results
                ? []
                : results?.map((item: MovieCardPropsResponse): MovieCardProps => {
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
                  }),
        },
        revalidate: 3600,
    };
};

export default MostWatchedPage;
