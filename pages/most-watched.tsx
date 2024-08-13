import { GetStaticProps } from 'next';
import MovieCard from "@molecules/MovieCard";

const MostWatchedPage = () => {
    return (
        <div style={{ padding: 20 }}>
            most-watched
            <MovieCard url="https://www.google.com/" id="1"/>
            <MovieCard url="https://www.google.com/" id="2"/>
            <MovieCard url="https://www.google.com/" id="3"/>
            <MovieCard url="https://www.google.com/" id="4"/>
            <MovieCard url="https://www.google.com/" id="5"/>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => ({
    props: {},
    revalidate: 10,
});

export default MostWatchedPage;
