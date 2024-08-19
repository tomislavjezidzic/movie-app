import styles from './SimpleMovieCard.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import cn from 'classnames';
import Icon from '@atoms/Icons';
import FavoriteButton from '@atoms/FavoriteButton';

export interface SimpleMovieCardProps {
    image?: {
        src: string;
        alt: string;
    };
    title?: string;
    slug?: string;
    id?: string;
    lazyLoad?: boolean;
}

const SimpleMovieCard = ({ image, slug, title, id, lazyLoad = true }: SimpleMovieCardProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        /* using a tag because of Netlify errors & static page doesn't exist */
        /*<NextLink href={`/movie/${slug}`} className={styles.link} />*/
        <a href={`/movie/${slug}`} className={styles.card}>
            {image && (
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
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
                </div>
            )}

            <div className={styles.content}>
                <p className={cn(styles.title, 'u-b0')}>{title}</p>
            </div>
        </a>
    );
};

export default SimpleMovieCard;
