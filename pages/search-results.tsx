import { GetStaticProps } from 'next';
import Header from '@organisms/layout/Header';

const MostWatchedPage = () => {
    return (
        <>
            <Header title="Most Watched" />

            {/*<MovieList items={data} isLoading={isLoading} isFiltersLoading={isFiltersLoading} />*/}
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Search Results',
        },
        revalidate: 3600,
    };
};

export default MostWatchedPage;
