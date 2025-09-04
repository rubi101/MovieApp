import React from 'react'
import "../css/Favorites.css"
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

const Faav = () => {
  const {favorites} = useMovieContext()
  if(favorites.length) {
    return (
      <div className='favorites'>
         <h2>Your Favorites</h2>
         
      <div className="movies-grid">

            {favorites.map((movie)=> (
                <MovieCard movie1={movie} key={movie.id}/>
                ))}
        </div>
        </div>
    )
  
  }
  return (
    <div className='favorites-empty'>
        <h2>No Fav movies yet!!</h2>
        <p>Start adding movies </p>
      
    </div>
  )
}

export default Faav
