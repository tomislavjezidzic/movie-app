import MovieCard from '@molecules/MovieCard';

const SingleMoviePage = () => {
    return (
        <div style={{ padding: 20 }}>
            single movie
            <MovieCard url="https://www.google.com/" id="1"/>
            <MovieCard url="https://www.google.com/" id="2"/>
            <MovieCard url="https://www.google.com/" id="3"/>
            <MovieCard url="https://www.google.com/" id="4"/>
            <MovieCard url="https://www.google.com/" id="5"/>
        </div>
    );
};

export default SingleMoviePage;
