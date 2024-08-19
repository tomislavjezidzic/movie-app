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
    const [searchResults, setSearchResults] = useState([]);
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
            setSearchResults([]);
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
                makeApiCall().then(response => {
                    response.json().then(data => {
                        if (isFetchActive) {
                            setSearchResults(data.remappedResults);
                        }
                    });
                });
            } else if (searchQuery.length < 3) {
                setSearchResults([]);
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
                if (key < searchResults.length - 1 || key === undefined) {
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
                                    [styles.isVisible]: searchResults.length > 0,
                                })}
                            >
                                <div className={styles.inner}>
                                    <div className={styles.movieList} ref={searchResultsList}>
                                        {searchResults.map((movie: MovieCardProps, key) => (
                                            <div
                                                // @ts-ignore
                                                ref={el => (searchCards.current[key] = el)}
                                                onKeyDown={ev => handleKeyDown(ev, key)}
                                                key={`search-movie-card-${key}`}
                                            >
                                                <SimpleMovieCard {...movie} />
                                            </div>
                                        ))}
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
