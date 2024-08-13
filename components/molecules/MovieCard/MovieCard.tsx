import NextLink from 'next/link';
import styles from './MovieCard.module.scss';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from '@hooks/useLocalStorage';

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
            <NextLink href={url}>
                {image && <Image src={image.src} alt={image.alt} width={200} height={300} />}
                <p className={styles.title}>{title}</p>
                <p className={styles.score}>{score}</p>
            </NextLink>
            <button onClick={handleClick}>favorite {isFavorited ? '❤️' : '🤍'}</button>
        </div>
    );
};

export default MovieCard;
