import { GetStaticProps } from 'next';
import Header from '@organisms/layout/Header';
import Footer from '@organisms/layout/Footer';

const IndexPage = () => {
    return (
        <>
            <Header title="404" centered />

            <Footer />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: '404',
        },
        revalidate: 3600,
    };
};

export default IndexPage;
