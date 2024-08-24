import styles from './Favorites.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useLocalstorageState } from '@hooks/useLocalstorageState';
import MovieList from '@organisms/MovieList';
import LoadingIndicator from '@atoms/LoadingIndicator';
import { MovieCardProps } from '@molecules/MovieCard';

export interface FavoritesProps {}

const Favorites = ({}: FavoritesProps) => {
    const [movieIds, setMovieIds] = useLocalstorageState('favorite_movies', '');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const makeApiCall = async (movieId: string) => {
        if (!movieId) return;

        return await fetch('/api/movie', {
            method: 'POST',
            body: JSON.stringify({
                movieId,
            }),
        });
    };

    useEffect(() => {
        const storageIds = movieIds !== null && movieIds !== '' ? JSON.parse(movieIds) : [];
        const moviePromises = [];
        if (storageIds?.length > 0) {
            storageIds.forEach((movieId: string) => {
                moviePromises.push(makeApiCall(movieId));
            });

            Promise.all(moviePromises)
                .then(data => data.map(item => item.json()))
                .then(data => {
                    data.forEach(d => {
                        d.then((singleMovie: MovieCardProps) => {
                            setItems(items => [...items, singleMovie]);
                        });
                    });
                })
                .finally(() => setIsLoading(false));
        }
    }, []);

    return (
        <section className={cn(styles.main, 'o-section')}>
            <div className={styles.inner}>
                <div className="o-container">
                    <div className={styles.top}>
                        <h2 className={cn('u-a4')}>Favorites</h2>

                        {isLoading && <LoadingIndicator />}
                    </div>
                </div>

                {!isLoading && <MovieList items={items} />}
            </div>
        </section>
    );
};

export default Favorites;
