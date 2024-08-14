'use server';

export async function getMovies(page: number) {
    const apiUrl = `${process.env.TMDB_BASE_URL_ENDPOINT}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}`;
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
