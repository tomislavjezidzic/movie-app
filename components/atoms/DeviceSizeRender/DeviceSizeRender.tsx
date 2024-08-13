import { ReactNode, memo, useCallback, useEffect, useState } from 'react';
import styles from './DeviceSizeRender.module.scss';

type breakpointNames = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

interface DeviceSizeRenderProps {
    minWidth?: breakpointNames;
    maxWidth?: breakpointNames;
    children: ReactNode;
}

const DeviceSizeRender = memo(({ minWidth, maxWidth, children }: DeviceSizeRenderProps) => {
    const [isVisible, setVisible] = useState(false);

    const desiredShowWidth = minWidth ? parseInt(styles[`breakpoint-${minWidth}`]) : 0;
    const desiredHideWidth = maxWidth ? parseInt(styles[`breakpoint-${maxWidth}`]) : 999999;

    const checkIfHidden = useCallback(() => {
        const winWidth = window.innerWidth;
        setVisible(winWidth > desiredShowWidth && winWidth <= desiredHideWidth);
    }, [desiredShowWidth, desiredHideWidth, setVisible]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            checkIfHidden();
            window.addEventListener('resize', checkIfHidden);
            return () => {
                window.removeEventListener('resize', checkIfHidden);
            };
        }
    }, [checkIfHidden]);

    return isVisible && <>{children}</>;
});

export default DeviceSizeRender;
