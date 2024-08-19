import styles from './MovieList.module.scss';
import MovieCard, { MovieCardProps } from '@molecules/MovieCard';
import cn from 'classnames';
import LoadingIndicator from '@atoms/LoadingIndicator';

export interface MovieListProps {
    items: MovieCardProps[];
    isLoading?: boolean;
}

const MovieList = ({ items, isLoading = false }: MovieListProps) => (
    <section className={cn(styles.main, 'o-section')}>
        <div className="o-container">
            <div className={styles.inner}>
                <div
                    className={cn(styles.loadingWrapper, {
                        [styles.isLoading]: isLoading,
                    })}
                >
                    <LoadingIndicator />
                </div>

                {items?.length > 0 ? (
                    <div className={styles.list}>
                        {items.map((movie: MovieCardProps, key) => (
                            <div className={styles.item} key={`movie--${key}`}>
                                <MovieCard {...movie} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noResults}>
                        <h1 className={cn('u-a5')}>No results</h1>
                    </div>
                )}
            </div>
        </div>
    </section>
);

export default MovieList;
