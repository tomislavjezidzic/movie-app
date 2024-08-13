import { ReactNode, useCallback } from 'react';
import cn from 'classnames';
import NextLink from 'next/link';
import styles from './Button.module.scss';

export interface ButtonProps {
    label?: string | ReactNode;
    ariaLabel?: string;
    disabled?: boolean;
    url?: string;
    newTab?: boolean;
    btnType?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

const Button = ({
    label,
    ariaLabel,
    disabled = false,
    url = '',
    newTab,
    btnType = 'button',
    onClick,
}: ButtonProps) => {
    const handleClick = useCallback(() => {
        if (onClick && typeof onClick === 'function') onClick();
    }, [onClick]);

    const btnStyles = cn('u-b1', 'u-uppercase', styles.button, {
        [styles.disabled]: disabled,
    });

    return url ? (
        <NextLink
            href={url}
            className={btnStyles}
            target={newTab ? '_blank' : null}
            onClick={handleClick}
        >
            {label}
        </NextLink>
    ) : (
        <button
            aria-label={ariaLabel}
            aria-disabled={disabled}
            disabled={disabled}
            className={btnStyles}
            onClick={handleClick}
            type={btnType}
        >
            {label}
        </button>
    );
};

export default Button;
