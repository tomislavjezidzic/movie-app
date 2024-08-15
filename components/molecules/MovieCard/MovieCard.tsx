import NextLink from 'next/link';
import styles from './MovieCard.module.scss';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useLocalstorageState } from '@hooks/useLocalstorageState';
import cn from 'classnames';
import Icon from '@atoms/Icons';

export interface MovieCardProps {
    image?: {
        src: string;
        alt: string;
    };
    title?: string;
    score?: string;
    slug?: string;
    id?: string;
}

const MovieCard = ({ image, slug, score, title, id }: MovieCardProps) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [movieIds, setMovieIds] = useLocalstorageState('favorite_movies', '');

    useEffect(() => {
        setIsFavorited(movieIds?.includes(id) ?? false);
    }, [isFavorited, movieIds]);

    const handleClick = useCallback(() => {
        const storageIds = movieIds !== null && movieIds !== '' ? JSON.parse(movieIds) : [];

        if (storageIds.includes(id)) {
            storageIds.splice(storageIds.indexOf(id), 1);
        } else {
            storageIds.push(id);
        }

        setIsFavorited(storageIds?.includes(id) ?? false);
        setMovieIds(JSON.stringify(storageIds));
    }, [movieIds]);

    return (
        <div className={styles.card}>
            <NextLink href={`movie/${slug}`} className={styles.link} />
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
                <p className={cn(styles.title, 'u-b0')}>{title}</p>
                <button onClick={handleClick} className={styles.favoriteBtn}>
                    {isFavorited ? <Icon name="heartFill" /> : <Icon name="heartOutline" />}
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
