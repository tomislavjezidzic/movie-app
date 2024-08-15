import styles from './MoviesScrollableRow.module.scss';
import MovieCard, { MovieCardProps } from '@molecules/MovieCard';
import cn from 'classnames';

export interface MoviesScrollableRowProps {
    title: string;
    items: MovieCardProps[];
}

const MoviesScrollableRow = ({ title, items }: MoviesScrollableRowProps) => {
    return (
        <section className={cn(styles.main, 'o-section')}>
            <div className="o-container">
                <div className={styles.inner}>
                    <div className={styles.titleWrapper}>
                        <h2 className={cn(styles.title, 'u-a3')}>{title}</h2>
                    </div>
                    <div className={styles.listWrapper}>
                        <div className={styles.list}>
                            {items.map((movie: MovieCardProps, key) => (
                                <div className={styles.item} key={`movie-list-item-${key}`}>
                                    <MovieCard {...movie} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MoviesScrollableRow;
