import React from 'react'
import "../css/MovieCard.css"
import { useMovieContext } from '../contexts/MovieContext'
import { Link } from 'react-router-dom'



const MovieCard = ({movie1}) => {
    const {isFavorite, addToFavorites,removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie1.id)


    const onFavorite= (e) =>{
        e.preventDefault()
        if(favorite){
            removeFromFavorites(movie1.id)
        }else{
            addToFavorites(movie1)
        }
    
    }
  return (
    <div>
        <Link to={`/movie/${movie1.id}`}>
         <div className='movie-card'>
        <div className='movie-poster'>
            <img src={`https://image.tmdb.org/t/p/w500${movie1.poster_path}`} alt={movie1.title} />
            <div className='movie-overlay'>
                <button className= {`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavorite}>❤︎</button>
            </div>

        </div>
        <div className="movie-info">
            <h3> {movie1.title}</h3>
            <p> {movie1.release_date?.split("-")[0]}</p>

        </div>
      
    </div>
        </Link>
    </div>
   
  )
}

export default MovieCard
