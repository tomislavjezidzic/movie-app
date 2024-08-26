import styles from './Search.module.scss';
import cn from 'classnames';
import SimpleMovieCard, { SimpleMovieCardProps } from '@molecules/SimpleMovieCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export interface SearchProps {}

const Search = ({}: SearchProps) => {
    const router = useRouter();
    const searchResultsList = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const searchCards = useRef<any>([]);

    const makeApiCall = useCallback(async () => {
        if (!searchQuery) return;
        return await axios.post('/api/movies', { searchQuery });
    }, [searchQuery]);

    useEffect(() => {
        let isFetchActive = true;
        const timeoutId = setTimeout(() => {
            if (searchQuery && searchQuery.length >= 3) {
                makeApiCall()
                    .then(data => {
                        if (isFetchActive) {
                            setSearchResults(data.data.remappedResults);
                        }
                    })
                    .catch(err => console.log(`Search error: ${err}`));
            } else if (searchQuery.length < 3) {
                setSearchResults(null);
            }
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            isFetchActive = false;
        };
    }, [searchQuery]);

    useEffect(() => {
        const completeHandler = () => {
            setSearchQuery('');
            setSearchResults(null);
        };

        router.events.on('routeChangeComplete', completeHandler);

        return () => {
            router.events.off('routeChangeComplete', completeHandler);
        };
    }, []);

    const handleKeyUp = useCallback(
        (
            ev: {
                currentTarget: any;
                key: string;
                preventDefault: () => void;
            },
            key: number
        ) => {
            if (ev.key === 'ArrowDown') {
                ev.preventDefault();
                if (key < searchResults?.length - 1 || key === undefined) {
                    searchCards?.current[key !== undefined ? key + 1 : 0]
                        ?.querySelector('a')
                        ?.focus();
                }
            } else if (ev.key === 'ArrowUp') {
                ev.preventDefault();
                if (key > 0) {
                    searchCards?.current[key - 1]?.querySelector('a')?.focus();
                }
            } else if (ev.key === 'Enter' && ev.currentTarget?.value?.length > 2) {
                router
                    .push({
                        pathname: `/search-results`,
                        query: {
                            searchParam: ev.currentTarget.value,
                        },
                    })
                    .then(() => {});
            }
        },
        [searchCards, searchResults]
    );

    return (
        <div className={styles.main}>
            <input
                type="text"
                className={styles.input}
                placeholder="Search Movies..."
                value={searchQuery}
                onChange={ev => setSearchQuery(ev.target.value)}
                onKeyUp={ev => handleKeyUp(ev, undefined)}
            />

            <div
                className={cn(styles.results, {
                    [styles.isVisible]: searchResults,
                })}
            >
                <div className={styles.inner}>
                    <div className={styles.list} ref={searchResultsList}>
                        {searchResults?.length > 0 ? (
                            searchResults.map((movie: SimpleMovieCardProps, index: number) => (
                                <div
                                    key={`search-movie-card-${index}`}
                                    // @ts-ignore
                                    ref={element => (searchCards.current[index] = element)}
                                    onKeyDown={event => handleKeyUp(event, index)}
                                >
                                    <SimpleMovieCard {...movie} />
                                </div>
                            ))
                        ) : (
                            <p>No results</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
