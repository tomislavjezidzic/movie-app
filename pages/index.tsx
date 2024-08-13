import { GetStaticProps } from 'next';

const IndexPage = () => {
    return (
        <div style={{ padding: 20 }}>
            homepage
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => ({
    props: {},
    revalidate: 10,
});

export default IndexPage;
