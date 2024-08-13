import React, { useMemo } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { GLOBALS } from '@libs/data';

export interface SeoHeadProps {
    title?: string;
    description?: string;
    locale?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
}

const SeoHead = ({
    title,
    description,
    locale,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
}: SeoHeadProps) => {
    const pageUrl = useMemo(() => {
        if (Router?.router?.asPath && process.env.NEXT_PUBLIC_URL) {
            return `${process.env.NEXT_PUBLIC_URL}${Router?.router?.asPath}`;
        }
        return '';
    }, []);

    return (
        <Head>
            <link rel="alternate" href={pageUrl} />
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width, user-scalable=no"
            />

            <title>{title || GLOBALS.title}</title>
            <meta name="og:title" property="og:title" content={ogTitle || title || GLOBALS.title} />
            <meta
                name="twitter:title"
                property="twitter:title"
                content={twitterTitle || title || GLOBALS.title}
            />
            <meta name="og:site_name" property="og:site_name" content={GLOBALS.title} />
            <meta name="og:type" property="og:type" content="website" />
            {locale && <meta name="og:locale" property="og:locale" content={locale} />}

            {description && (
                <>
                    <meta name="description" property="description" content={description} />
                </>
            )}

            {(description || ogDescription) && (
                <meta
                    name="og:description"
                    property="og:description"
                    content={ogDescription || description}
                />
            )}

            {(description || twitterDescription) && (
                <meta
                    name="twitter:description"
                    property="twitter:description"
                    content={twitterDescription || description}
                />
            )}

            {pageUrl && (
                <>
                    <meta name="og:url" property="og:url" content={pageUrl} />
                    <link rel="canonical" href={pageUrl} />
                </>
            )}

            <meta name="og:image:width" property="og:image:width" content="1200" />
            <meta name="og:image:height" property="og:image:height" content="630" />
            <meta name="og:image" property="og:image" content={ogImage || GLOBALS.shareImage} />

            <meta name="twitter:card" property="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:image"
                property="twitter:image"
                content={twitterImage || GLOBALS.shareImage}
            />

            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#b0ceff" />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <meta name="msapplication-TileColor" content="#b0ceff" />
            <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
    );
};

export default SeoHead;
