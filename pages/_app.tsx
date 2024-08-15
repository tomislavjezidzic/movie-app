import { useEffect } from 'react';
import { AppProps as NextAppProps } from 'next/app';
import useWindowResize from '@hooks/useWindowResize';
import { setGlobalCSSVariable } from '@libs/helpers';
import Fonts from '@organisms/layout/Fonts';
import SeoHead from '@organisms/layout/SeoHead';
import 'scss/style.scss';

type AppProps<P = any> = {
    pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

const App = ({ Component, pageProps }: AppProps) => {
    // set initial value
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            setGlobalCSSVariable('--window-height', `${window.innerHeight}px`);
        }
    }, []);

    // reset value on resize
    useWindowResize(() => {
        setGlobalCSSVariable('--window-height', `${window.innerHeight}px`);
    });

    return (
        <>
            <Fonts />
            <SeoHead title={pageProps.title} />
            <main className="o-page">
                <Component {...pageProps} />
            </main>
        </>
    );
};

export default App;

export function reportWebVitals(metric) {
    const styling = ['color: gold', 'display: block'].join(';');
    if (process.env.NODE_ENV === 'development') {
        if (metric?.name === 'TTFB') {
            const timeSec = parseFloat(`${Number(metric?.value) / 1000}`).toFixed(2);
            console.info(`%cWeb vitals (TTFB): ${timeSec}s`, styling);
        }
        if (metric.name === 'Next.js-route-change-to-render') {
            const timeSec = parseFloat(`${Number(metric?.value) / 1000}`).toFixed(2);
            console.info(`%cWeb vitals (change-to-render): ${timeSec}s`, styling);
        }
    }
}
