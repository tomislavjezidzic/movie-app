import styles from './MovieList.module.scss';
import MovieCard, {MovieCardProps} from "@molecules/MovieCard";

export interface MovieListProps {
    items: MovieCardProps[];
}

const MovieList = ({items}: MovieListProps) => {
    return (
        <div className={styles.list}>
            {items.map((movie: any) =>
                <div className={styles.item}>
                    <MovieCard {...movie} />
                </div>
            )}
        </div>
    );
};

export default MovieList;
