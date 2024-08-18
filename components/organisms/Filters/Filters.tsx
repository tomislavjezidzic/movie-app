import styles from './Filters.module.scss';
import cn from 'classnames';
import { GENRES } from '@libs/data';
import { useCallback } from 'react';

export interface GenresListProps {
    setGenre: (genres: any) => void;
    setYear: (genres: any) => void;
    setScore: (genres: any) => void;
}

const Filters = ({ setGenre, setYear, setScore }: GenresListProps) => {
    const currentYear = new Date().getFullYear();

    const handleGenreChange = useCallback((ev: { target: { value: string } }) => {
        if (ev.target.value !== null && ev.target.value !== 'all') {
            setGenre(ev.target.value);
        } else {
            setGenre(null);
        }
    }, []);

    const handleYearChange = useCallback((ev: { target: { value: string } }) => {
        if (ev.target.value !== null && ev.target.value !== 'all') {
            setYear(ev.target.value);
        } else {
            setYear(null);
        }
    }, []);

    const handleScoreChange = useCallback((ev: { target: { value: string } }) => {
        if (ev.target.value !== null && ev.target.value !== 'all') {
            setScore(ev.target.value);
        } else {
            setScore(null);
        }
    }, []);

    return (
        <section className={cn(styles.main, 'o-section', 'u-b2')}>
            <div className="o-container">
                <div className={styles.inner}>
                    <div className={styles.selectWrapper}>
                        <p>Genre:</p>
                        <div className={styles.select}>
                            <select
                                className={cn(styles.selectInput, 'u-b0')}
                                name="genres"
                                id="genres"
                                onChange={ev => handleGenreChange(ev)}
                            >
                                <option value="all">All</option>
                                {GENRES.genres.map((genre, key) => (
                                    <option key={`genres-item-${key}`} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.selectWrapper}>
                        <p>Year:</p>
                        <div className={styles.select}>
                            <select
                                className={cn(styles.selectInput, 'u-b0')}
                                name="years"
                                id="years"
                                onChange={ev => handleYearChange(ev)}
                            >
                                <option value="all">All</option>
                                {/* 1887 is the first queryable year */}
                                {[...Array(currentYear - 1886)].map((item, key) => (
                                    <option key={`years-item-${key}`} value={currentYear - key}>
                                        {currentYear - key}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.selectWrapper}>
                        <p>Score:</p>
                        <div className={styles.select}>
                            <select
                                className={cn(styles.selectInput, 'u-b0')}
                                name="score"
                                id="score"
                                onChange={ev => handleScoreChange(ev)}
                            >
                                <option value="all">All</option>
                                {[...Array(10)].map((item, key) => (
                                    <option key={`score-item-${key}`} value={key + 1}>
                                        {key + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Filters;
