import React from 'react'
import './css/App.css'
import MovieCard from './components/MovieCard'
import { MovieProvider } from './contexts/MovieContext'
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import Faav from './pages/Faav'
import NavBar from './components/NavBar'
import MovieDetails from './components/MovieDetails'


const App = () => {
  return (
    <MovieProvider>
      <div>
        <NavBar/>
      </div>
      <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/fav' element={<Faav/>}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
      </Routes>

    </main>
    </MovieProvider>
  )
}

export default App
