const API_KEY = "d16665877f744d6b199ae778e7f3f1b0"
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async() =>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results

}


export const searchMovies = async (query) =>{
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    )
    const data = await response.json()
    return data.results
}
export const getMovieDetails = async(id) => {
    const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`  
    )
    const data = await response.json()
    return data
}


export const getMovieVideos = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  )
  const data = await response.json();
  return data;
}
