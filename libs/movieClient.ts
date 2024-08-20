import axios from 'axios';
import * as console from 'node:console';

const axiosClient = axios.create({
    baseURL: process.env.TMDB_BASE_URL_ENDPOINT,
});

export async function getMostWatched(genreId: number, year: number, score: number, page?: number) {
    const dynamicQuery = `${year && `&year=${year}`}${score && `&vote_average.gte=${score}`}&page=${page ? page : 1}${genreId && `&with_genres=${genreId}`}`;
    return await axiosClient
        .get(
            `/discover/movie?include_adult=false&include_video=false&language=en-US${dynamicQuery}&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}`
        )
        .catch(error => {
            console.log(`Most watched end point error: ${error}`);
        });
}

export async function getNewest() {
    return await axiosClient
        .get(`/movie/now_playing?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`)
        .catch(error => {
            console.log(`Newest end point error: ${error}`);
        });
}

export async function getTopRated() {
    return await axiosClient
        .get(`/movie/top_rated?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`)
        .catch(error => {
            console.log(`Top rated end point error: ${error}`);
        });
}

export async function getMovie(movieId: number) {
    return await axiosClient
        .get(
            `/movie/${movieId}?append_to_response=credits&language=en-US&with_cast=true&api_key=${process.env.TMDB_API_KEY}`
        )
        .catch(error => {
            console.log(`Single movie end point error: ${error}`);
        });
}

export async function getQueriedMovies(searchQuery: string) {
    return await axiosClient
        .get(
            `/search/movie?query=${searchQuery}&include_adult=false&language=en-US&api_key=${process.env.TMDB_API_KEY}`
        )
        .catch(error => {
            console.log(`Queried Movies end point error: ${error}`);
        });
}
