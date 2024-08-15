import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.TMDB_BASE_URL_ENDPOINT,
});

export default async function getMostWatched(page: number) {
    return await axiosClient.get(
        `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}`
    );
}
