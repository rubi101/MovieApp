import React, { useEffect, useState } from 'react'
import { searchMovies,getPopularMovies } from '../services/api'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'

const Home = () => {
    const [searchQuery,setSearchQuery] = useState("")
    const [movies,setMovies] = useState([])
    const [error, setError]  = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)

            }
            catch(e){
                console.log(e)
                setError("Failed to load movies....")
            }
            finally{
                setLoading(false)

            }
        }

        loadPopularMovies()
    },[])

    // const movies = [
    //     {id:1, title: "See",releaseDate: "2024"},
    //     {id:2, title: "Catch me",releaseDate: "2004"},
    //     {id:3, title: "Hello there!",releaseDate: "1989"}

    // ]

    const handleSearch = async(e) =>{
        e.preventDefault()
        if(!searchQuery.trim())return
        if(loading)return
        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        }
        catch(e){
            console.log(e)
            setError("Failed to search movies....")
        }finally{
            setLoading(false)
        }

        

    }


  return (
    <div className='home'>
        <form  onSubmit={handleSearch} className='search-form'>
            <input 
            type="text"
            placeholder='Search for movies...'
            className='search-input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button  type="submit" className="search-button">Search</button>

        </form>
        {error && <div className='error-message'>{error}</div>}


       {loading ? (
        <div className="loading">Loading...</div>
       ) : (<div className="movies-grid">

            {movies.map((movie)=> (
                <MovieCard movie1={movie} key={movie.id}/>
                ))}
        </div>)}
      
    </div>
  )
}

export default Home
