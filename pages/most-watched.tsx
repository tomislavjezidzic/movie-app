import { GetStaticProps } from 'next';

const MostWatchedPage = () => {
    return (
        <div style={{ padding: 20 }}>
            most-watched
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => ({
    props: {},
    revalidate: 10,
});

export default MostWatchedPage;
