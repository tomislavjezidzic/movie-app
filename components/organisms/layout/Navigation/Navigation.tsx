import styles from './Navigation.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

export interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
    const pathname = usePathname();

    return (
        <div className={styles.main}>
            <div className="o-container">
                <div className={styles.inner}>
                    <nav className={styles.navigation}>
                        <ul className={styles.navigationList}>
                            <li
                                className={cn(styles.navigationItem, {
                                    [styles['is-active']]: pathname === '/',
                                })}
                            >
                                <Link href="/">Home</Link>
                            </li>

                            <li
                                className={cn(styles.navigationItem, {
                                    [styles['is-active']]: pathname === '/most-watched',
                                })}
                            >
                                <Link href="/most-watched">Most Watched</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
