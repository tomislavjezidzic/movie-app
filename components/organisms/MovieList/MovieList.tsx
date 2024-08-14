import styles from './MovieList.module.scss';
import MovieCard, { MovieCardProps } from '@molecules/MovieCard';
import cn from 'classnames';

export interface MovieListProps {
    items: MovieCardProps[];
}

const MovieList = ({ items }: MovieListProps) => {
    return (
        <section className={cn(styles.main, 'o-section')}>
            <div className="o-container">
                <div className={styles.list}>
                    {items.map((movie: MovieCardProps) => (
                        <div className={styles.item}>
                            <MovieCard {...movie} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MovieList;
