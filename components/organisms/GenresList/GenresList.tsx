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
        <section className={cn(styles.main, 'o-section', 'u-b2')}>
            <div className="o-container">
                <div className={styles.inner}>
                    {GENRES.genres.map((genre, key) => (
                        <div key={`genres-item-${key}`} className={styles.item}>
                            <input
                                type="checkbox"
                                value={genre.id}
                                id={genre.id.toString()}
                                onChange={ev => handleChange(ev)}
                            />

                            <label className={styles.label} htmlFor={genre.id.toString()}>
                                <span>{genre.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GenresList;
