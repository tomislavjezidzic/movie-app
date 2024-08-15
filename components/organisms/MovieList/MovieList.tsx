import styles from './MovieList.module.scss';
import MovieCard, { MovieCardProps } from '@molecules/MovieCard';
import cn from 'classnames';

export interface MovieListProps {
    items: MovieCardProps[];
    isLoading?: boolean;
}

const MovieList = ({ items, isLoading = false }: MovieListProps) => {
    return (
        <section
            className={cn(styles.main, 'o-section', {
                [styles.isLoading]: isLoading,
            })}
        >
            <div className="o-container">
                <div className={styles.list}>
                    {items.map((movie: MovieCardProps, key) => (
                        <div className={styles.item} key={`movie--${key}`}>
                            <MovieCard {...movie} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MovieList;
