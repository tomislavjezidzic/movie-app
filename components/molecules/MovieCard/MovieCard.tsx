'use client';
import NextLink from 'next/link';
import styles from './MovieCard.module.scss';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../../../context';
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
    const { state, setState } = useAppContext();

    useEffect(() => {
        setIsFavorited(state?.ids?.includes(id));
    }, [isFavorited, state]);

    const handleClick = useCallback(() => {
        const items = useLocalStorage('favorite_movies');

        const storageIds = items?.value !== null ? items : { value: [] };
        if (storageIds.value.includes(id)) {
            storageIds.value = storageIds.value.filter(item => item !== id);
            setState({
                ids: state?.ids.filter(item => item !== id),
            });
        } else {
            storageIds.value.push(id);
            setState({
                ids: [...state?.ids, id],
            });
        }

        localStorage.setItem('favorite_movies', JSON.stringify(storageIds.value));
    }, [state]);

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
