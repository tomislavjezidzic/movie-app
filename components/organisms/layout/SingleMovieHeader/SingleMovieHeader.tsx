import styles from './SingleMovieHeader.module.scss';
import cn from 'classnames';
import Image from 'next/image';
import Icon from '@atoms/Icons';

export interface HeaderProps {
    posterImage: string;
    coverImage: string;
    title: string;
    score: string;
}

const SingleMovieHeader = ({ title, posterImage, coverImage, score }: HeaderProps) => {
    return (
        title && (
            <header className={cn(styles.main, 'o-header')}>
                <div className={styles.posterImage}>
                    <Image
                        src={coverImage}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
                <div className="o-container">
                    <div className={styles.content}>
                        <div className={styles.contentImage}>
                            <Image
                                src={posterImage}
                                alt={title}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        </div>

                        <div className={styles.contentTitleWrapper}>
                            <h1 className={cn(styles.contentTitle, 'u-a5')}>{title}</h1>
                            <p>
                                <span className={styles.score}>
                                    <span>
                                        <Icon name="star" />
                                    </span>
                                    {score}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </header>
        )
    );
};

export default SingleMovieHeader;
