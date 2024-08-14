import styles from './MoviesRow.module.scss';
import MovieCard, { MovieCardProps } from '@molecules/MovieCard';
import cn from 'classnames';

export interface MoviesRowProps {
    title: string;
    items: MovieCardProps[];
}

const MoviesRow = ({ title, items }: MoviesRowProps) => {
    return (
        <section className={cn(styles.main, 'o-section')}>
            <div className="o-container">
                <div className={styles.inner}>
                    <div className={styles.titleWrapper}>
                        <h2 className={cn(styles.title, 'u-a5')}>{title}</h2>
                    </div>
                    <div className={styles.listWrapper}>
                        <div className={styles.list}>
                            {items.map((movie: MovieCardProps) => (
                                <div className={styles.item}>
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

export default MoviesRow;
