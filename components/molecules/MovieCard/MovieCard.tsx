import styles from './MovieCard.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import cn from 'classnames';
import Icon from '@atoms/Icons';
import FavoriteButton from '@atoms/FavoriteButton';

export interface MovieCardProps {
    image?: {
        src: string;
        alt: string;
    };
    title?: string;
    score?: string;
    slug?: string;
    id?: string;
    lazyLoad?: boolean;
}

const MovieCard = ({ image, slug, score, title, id, lazyLoad = true }: MovieCardProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div className={styles.card}>
            {/* using a tag because of Netlify errors & static page doesn't exist */}
            {/*<NextLink href={`movie/${slug}`} className={styles.link} />*/}
            <a href={`movie/${slug}`} className={styles.link} />
            {image && (
                <div className={styles.imageContainer}>
                    <div className={styles.scoreContainer}>
                        <p className={cn(styles.score, 'u-b2')}>
                            <span>
                                <Icon name="star" />
                            </span>
                            {score}
                        </p>
                    </div>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={200}
                        height={300}
                        className={styles.image}
                        priority={!lazyLoad}
                        onLoad={() => setIsImageLoaded(true)}
                    />

                    <i
                        className={cn(styles.imageOverlay, {
                            [styles.isVisible]: !isImageLoaded,
                        })}
                    ></i>
                </div>
            )}

            <div className={styles.content}>
                <p className={cn(styles.title, 'u-b0')}>{title}</p>
                <div className={styles.favoriteButton}>
                    <FavoriteButton id={id} />
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
