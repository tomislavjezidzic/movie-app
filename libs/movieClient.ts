import axios from 'axios';
import * as console from 'node:console';

const axiosClient = axios.create({
    baseURL: process.env.TMDB_BASE_URL_ENDPOINT,
});

export async function getMostWatched(page: number) {
    return await axiosClient.get(
        `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}`
    );
}

export async function getMoviesByGenre(id: number) {
    return await axiosClient.get(
        `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}&api_key=${process.env.TMDB_API_KEY}`
    );
}

export async function getNewest() {
    return await axiosClient.get(
        `/movie/now_playing?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`
    );
}

export async function getTopRated() {
    return await axiosClient.get(
        `/movie/top_rated?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`
    );
}

export async function getMovie(movieId) {
    return await axiosClient
        .get(`movie/${movieId}?language=en-US&api_key=${process.env.TMDB_API_KEY}`)
        .catch(error => {
            console.log('Error: ', error);
        });
}
