import styles from './Favorites.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useLocalstorageState } from '@hooks/useLocalstorageState';
import MovieList from '@organisms/MovieList';
import LoadingIndicator from '@atoms/LoadingIndicator';
import axios from 'axios';

export interface FavoritesProps {}

const Favorites = ({}: FavoritesProps) => {
    const [movieIds, setMovieIds] = useLocalstorageState('favorite_movies', '');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const makeApiCall = async (movieId: string) => {
        if (!movieId) return;

        return await axios.post('/api/movie', { movieId });
    };

    useEffect(() => {
        const storageIds = movieIds !== null && movieIds !== '' ? JSON.parse(movieIds) : [];
        const moviePromises = [];

        if (storageIds?.length > 0) {
            const fetchData = async () => {
                storageIds.forEach((movieId: string) => {
                    moviePromises.push(makeApiCall(movieId));
                });

                const data = await Promise.all(moviePromises);
                return await Promise.all(data);
            };

            fetchData()
                .then(data => {
                    setItems(
                        data.map(item => {
                            const itemData = item?.data;
                            return {
                                image: itemData?.image,
                                title: itemData?.title,
                                score: itemData?.score,
                                slug: itemData?.slug,
                                id: itemData?.id,
                            };
                        })
                    );
                })
                .finally(() => {
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        } else {
            setIsLoading(false);
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
