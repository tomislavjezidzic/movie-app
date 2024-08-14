import styles from './Header.module.scss';
import cn from 'classnames';

export interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        title && (
            <header className={cn(styles.main, 'o-header')}>
                <div className="o-container">
                    <h1 className={cn(styles.title, 'u-a5')}>{title}</h1>
                </div>
            </header>
        )
    );
};

export default Header;
