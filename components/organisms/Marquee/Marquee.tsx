import styles from './Marquee.module.scss';
import cn from 'classnames';

export interface MarqueeProps {
    content: string[];
}

const Marquee = ({ content }: MarqueeProps) => {
    let keysArray = [0, 1, 2, 3, 4];

    if (content.length < 3) {
        keysArray = [0, 1, 2, 3, 4, 5, 6];
    }

    return (
        <section className={cn(styles.wrapper, 'o-section', 'u-a4')}>
            {keysArray.map(index => (
                <div className={styles.mover} key={`marquee-mover-${index}`}>
                    {content?.map((item, key) => (
                        <span key={`marquee-item-${index}-${key}`}>{item}</span>
                    ))}
                </div>
            ))}
        </section>
    );
};

export default Marquee;
