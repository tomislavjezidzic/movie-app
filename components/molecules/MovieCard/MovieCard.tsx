import NextLink from 'next/link';
import styles from './MovieCard.module.scss';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from '@hooks/useLocalStorage';
import cn from 'classnames';
import Icon from '@atoms/Icons';

export interface MovieCardProps {
    image?: {
        src: string;
        alt: string;
    };
    title?: string;
    score?: string;
    url?: string;
    id?: string;
}

const MovieCard = ({ image, url, score, title, id }: MovieCardProps) => {
    console.log(image.src);

    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const movieIds = useLocalStorage('favorite_movies');
        setIsFavorited(movieIds?.value?.includes(id) ?? false);
    }, [isFavorited]);

    const handleClick = useCallback(() => {
        const movieIds = useLocalStorage('favorite_movies');

        const storageIds = movieIds?.value !== null ? JSON.parse(movieIds.value) : [];
        if (storageIds.includes(id)) {
            storageIds.splice(storageIds.indexOf(id), 1);
        } else {
            storageIds.push(id);
        }

        setIsFavorited(storageIds?.includes(id) ?? false);
        useLocalStorage('favorite_movies', JSON.stringify(storageIds));
    }, []);

    return (
        <div className={styles.card}>
            <NextLink href={url} className={styles.link}></NextLink>
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
                    />
                </div>
            )}
            <div className={styles.content}>
                <p className={cn(styles.title, 'u-a2')}>{title}</p>
                <button onClick={handleClick} className={styles.favoriteBtn}>
                    {isFavorited ? <Icon name="heartOutline" /> : <Icon name="heartFill" />}
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
