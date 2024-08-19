import styles from './LoadingIndicator.module.scss';
import cn from 'classnames';

export interface LoadingIndicatorProps {
    large?: boolean;
    centered?: boolean;
}

const LoadingIndicator = ({ centered = false, large = false }: LoadingIndicatorProps) => {
    return (
        <div className={styles.main}>
            <h5
                className={cn(styles.text, 'u-a1', {
                    'u-text-center': centered,
                    'u-a5': large,
                })}
            >
                Loading...
            </h5>
        </div>
    );
};

export default LoadingIndicator;
