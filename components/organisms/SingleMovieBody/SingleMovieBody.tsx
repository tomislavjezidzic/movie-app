import styles from './SingleMovieBody.module.scss';
import cn from 'classnames';

export interface SingleMovieBodyProps {
    description: string;
    duration: number;
    country: string[];
    cast: string[];
}

const SingleMovieBody = ({ description, duration, country, cast }: SingleMovieBodyProps) => (
    <section className={cn(styles.main, 'o-section')}>
        <div className="o-container">
            <div className={styles.inner}>
                <div className={styles.contentBlock}>
                    <h3 className={cn(styles.title, 'u-a3')}>Overview</h3>
                    <div className={cn(styles.content, 'u-b0')}>{description}</div>
                </div>

                <div className={styles.contentBlock}>
                    <h3 className={cn(styles.title, 'u-a3')}>Duration</h3>
                    <div className={cn(styles.content, 'u-b0')}>{duration} min</div>
                </div>

                <div className={styles.contentBlock}>
                    <h3 className={cn(styles.title, 'u-a3')}>Country</h3>
                    <div className={cn(styles.content, 'u-b0')}>
                        <ul>
                            {country.map((country, key) => (
                                <li key={`country-${key}`}>{country}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.contentBlock}>
                    <h3 className={cn(styles.title, 'u-a3')}>Cast</h3>
                    <div className={cn(styles.content, 'u-b0')}>
                        <ul>
                            {cast.map((name, key) => (
                                <li key={`country-${key}`}>{name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default SingleMovieBody;
