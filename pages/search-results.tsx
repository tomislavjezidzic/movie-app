import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Header from '@organisms/layout/Header';
import { useCallback, useEffect, useState } from 'react';
import MovieList from '@organisms/MovieList';
import LoadingIndicator from '@atoms/LoadingIndicator';
import { useIntersectionObserverRef } from '@hooks/useIntersectionObserverRef';

const SearchResultsPage = () => {
    const router = useRouter();
    const [searchResults, setSearchResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [needsLoadMore, setNeedsLoadMore] = useState(true);
    const [page, setPage] = useState(2);

    const makeApiCall = async (searchQuery: string, passedPage?: number) => {
        return await fetch('/api/movies', {
            method: 'POST',
            body: JSON.stringify({
                searchQuery,
                isSearchPage: true,
                page: passedPage ? passedPage : page,
            }),
        });
    };

    const loadMore = useCallback(
        (searchQuery: string) => {
            setIsLoading(true);

            makeApiCall(searchQuery)
                .then(response => response.json())
                .then(newData => {
                    setNeedsLoadMore(newData.needsLoadMore);
                    setSearchResults([...searchResults, ...newData.remappedResults]);
                    setPage(p => p + 1);
                })
                .finally(() => {
                    setIsLoading(false);
                })
                .catch(err => console.log(`Load more error: ${err}`));
        },
        [makeApiCall, searchResults]
    );

    const callback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const searchQuery = router.query.searchParam as string;
            if (entries[0].intersectionRatio === 1 && !isLoading && needsLoadMore && searchQuery) {
                loadMore(searchQuery);
            }
        },
        [isLoading, needsLoadMore, loadMore]
    );

    const [loadMoreRef] = useIntersectionObserverRef(callback);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const searchQuery = router.query.searchParam as string;

        let isFetchActive = true;
        const timeoutId = setTimeout(() => {
            if (searchQuery && searchQuery.length >= 3) {
                makeApiCall(searchQuery, 1)
                    .then(response => response.json())
                    .then(data => {
                        if (isFetchActive) {
                            setSearchResults(data.remappedResults);
                        }
                    })
                    .catch(err => console.log(`Search error: ${err}`))
                    .finally(() => setIsInitialLoading(false));
            } else if (searchQuery.length < 3) {
                setSearchResults(null);
            }
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            isFetchActive = false;
        };
    }, [router]);

    return (
        <>
            <Header title={`Search Results for "${router.query.searchParam}"`} />

            <MovieList items={searchResults} isFiltersLoading={isInitialLoading} />

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
    return {
        props: {
            title: 'Search Results',
        },
        revalidate: 3600,
    };
};

export default SearchResultsPage;
