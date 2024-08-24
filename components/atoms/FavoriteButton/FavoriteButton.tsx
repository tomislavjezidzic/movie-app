import styles from './FavoriteButton.module.scss';
import Icon from '@atoms/Icons';
import { useCallback, useEffect, useState } from 'react';
import { useLocalstorageState } from '@hooks/useLocalstorageState';
import cn from 'classnames';

export interface FavoriteButtonProps {
    id: string;
    large?: boolean;
}

const FavoriteButton = ({ id, large = false }: FavoriteButtonProps) => {
    const [movieIds, setMovieIds] = useLocalstorageState('favorite_movies', '');
    const [isFavorited, setIsFavorited] = useState(false);

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
        <button
            onClick={handleClick}
            className={cn(styles.button, {
                [styles.isLarge]: large,
            })}
        >
            {isFavorited ? <Icon name="heartFill" /> : <Icon name="heartOutline" />}
        </button>
    );
};

export default FavoriteButton;
