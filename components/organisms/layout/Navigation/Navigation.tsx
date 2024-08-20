import styles from './Navigation.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MovieCardProps } from '@molecules/MovieCard';
import { useRouter } from 'next/router';
import SimpleMovieCard from '@molecules/SimpleMovieCard';

export interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
    const navBar = useRef(null);
    const searchResultsList = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const searchCards = useRef<any>([]);

    useEffect(() => {
        if (navBar.current) {
            const navBarHeight = navBar.current.getBoundingClientRect().height;
            document.documentElement.style.setProperty('--navigation-height', navBarHeight + 'px');
        }
    }, [navBar]);

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

    const makeApiCall = async () => {
        return await fetch('/api/movies', {
            method: 'POST',
            body: JSON.stringify({ searchQuery: searchQuery }),
        });
    };

    useEffect(() => {
        let isFetchActive = true;
        const timeoutId = setTimeout(() => {
            if (searchQuery && searchQuery.length >= 3) {
                makeApiCall()
                    .then(response => response.json())
                    .then(data => {
                        if (isFetchActive) {
                            setSearchResults(data.remappedResults);
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

    const handleKeyDown = useCallback(
        (ev: { key: string }, key: number) => {
            if (ev.key === 'ArrowDown') {
                if (key < searchResults?.length - 1 || key === undefined) {
                    searchCards?.current[key !== undefined ? key + 1 : 0]
                        ?.querySelector('a')
                        ?.focus();
                }
            } else if (ev.key === 'ArrowUp') {
                if (key > 0) {
                    searchCards?.current[key - 1]?.querySelector('a')?.focus();
                }
            }
        },
        [searchCards, searchResults]
    );

    return (
        <div className={styles.main}>
            <div className={styles.top} ref={navBar}>
                <div className="o-container">
                    <div className={styles.inner}>
                        <nav className={styles.navigation}>
                            <ul className={styles.navigationList}>
                                <li
                                    className={cn(styles.navigationItem, {
                                        [styles.isActive]: pathname === '/',
                                    })}
                                >
                                    <Link href="/">Home</Link>
                                </li>

                                <li
                                    className={cn(styles.navigationItem, {
                                        [styles.isActive]: pathname === '/most-watched',
                                    })}
                                >
                                    <Link href="/most-watched">Most Watched</Link>
                                </li>
                            </ul>
                        </nav>

                        <div className={styles.searchInputWrapper}>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Search Movies..."
                                value={searchQuery}
                                onChange={ev => setSearchQuery(ev.target.value)}
                                onKeyDown={ev => handleKeyDown(ev, undefined)}
                            />

                            <div
                                className={cn(styles.searchResults, {
                                    [styles.isVisible]: searchResults,
                                })}
                            >
                                <div className={styles.inner}>
                                    <div className={styles.movieList} ref={searchResultsList}>
                                        {searchResults?.length > 0 ? (
                                            searchResults.map((movie, index) => (
                                                <div
                                                    key={`search-movie-card-${index}`}
                                                    // @ts-ignore
                                                    ref={element =>
                                                        (searchCards.current[index] = element)
                                                    }
                                                    onKeyDown={event => handleKeyDown(event, index)}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
