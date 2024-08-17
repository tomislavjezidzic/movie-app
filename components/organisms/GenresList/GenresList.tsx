import styles from './GenresList.module.scss';
import cn from 'classnames';
import { GENRES } from '@libs/data';
import { ChangeEvent, useCallback } from 'react';

export interface GenresListProps {
    genres: any;
    setGenres: (genres: any) => void;
}

const GenresList = ({ genres, setGenres }: GenresListProps) => {
    const handleChange = useCallback(
        (ev: { target: { checked: boolean; value: string } }) => {
            if (ev.target.checked) {
                setGenres([...genres, ev.target.value]);
            } else {
                setGenres(genres.filter((item: any) => item !== ev.target.value));
            }
        },
        [genres]
    );

    return (
        <section className={cn(styles.wrapper, 'o-section', 'u-b0')}>
            {GENRES.genres.map((genre, key) => (
                <label key={`genres-item-${key}`}>
                    <span>{genre.name}</span>

                    <input type="checkbox" value={genre.id} onChange={ev => handleChange(ev)} />
                </label>
            ))}
        </section>
    );
};

export default GenresList;
