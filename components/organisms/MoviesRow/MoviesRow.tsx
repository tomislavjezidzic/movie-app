import styles from './MoviesRow.module.scss';
import MovieCard, { MovieCardProps } from '@molecules/MovieCard';
import cn from 'classnames';

export interface MoviesRowProps {
    title: string;
    items: MovieCardProps[];
    lazyLoad?: boolean;
}

const MoviesRow = ({ title, items, lazyLoad = true }: MoviesRowProps) => {
    return (
        <section className={cn(styles.main, 'o-section')}>
            <div className="o-container">
                <div className={styles.inner}>
                    <div className={styles.titleWrapper}>
                        <h2 className={cn(styles.title, 'u-a5')}>{title}</h2>
                    </div>
                    <div className={styles.listWrapper}>
                        <div className={styles.list}>
                            {items.map((movie: MovieCardProps, key) => (
                                <div className={styles.item} key={`movie-${key}`}>
                                    <MovieCard {...movie} lazyLoad={lazyLoad} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MoviesRow;
