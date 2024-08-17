import styles from './Navigation.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import MovieCard, { MovieCardProps } from '@molecules/MovieCard';
import { useRouter } from 'next/router';

export interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
    const navBar = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (navBar.current) {
            const navBarHeight = navBar.current.getBoundingClientRect().height;
            document.documentElement.style.setProperty('--navigation-height', navBarHeight + 'px');
        }
    }, [navBar]);

    useEffect(() => {
        const startHandler = () => {
            setSearchQuery('');
            setSearchResults([]);
        };

        router.events.on('routeChangeComplete', startHandler);

        return () => {
            router.events.off('routeChangeComplete', startHandler);
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
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn(styles.bottom, {
                    [styles.isVisible]: searchResults.length > 0,
                })}
            >
                <div className="o-container">
                    <div className={styles.inner}>
                        <ul className={styles.movieList}>
                            {searchResults.map((movie: MovieCardProps, key) => (
                                <li className={styles.movieItem} key={`search-result-movie-${key}`}>
                                    <MovieCard {...movie} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
