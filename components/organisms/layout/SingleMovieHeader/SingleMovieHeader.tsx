import styles from './SingleMovieHeader.module.scss';
import cn from 'classnames';
import Image from 'next/image';
import Icon from '@atoms/Icons';
import FavoriteButton from '@atoms/FavoriteButton';

export interface SingleMovieHeaderProps {
    posterImage: string;
    coverImage: string;
    title: string;
    score: string;
    id: string;
}

const SingleMovieHeader = ({
    id,
    title,
    posterImage,
    coverImage,
    score,
}: SingleMovieHeaderProps) => (
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

                    <div className={styles.favoriteButton}>
                        <FavoriteButton id={id} large />
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default SingleMovieHeader;
