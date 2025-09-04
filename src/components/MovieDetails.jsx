import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../services/api.js";
import "../css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovieDetails(id);
        setMovie(details);

        // fetch trailers
        const videos = await getMovieVideos(id);
        const trailer = videos.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie found</p>;

  return (
    <div className="movie-details-container">
      {/* Poster Section */}
      <div className="poster-section">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      {/* Details Section */}
      <div className="details-section">
        <h2>{movie.title}</h2>

        {/* Meta Info */}
        <div className="movie-meta">
          <img src="/star.svg" alt="star" />
          <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
          <span>·</span>
          <p className="lang">{movie.original_language}</p>
          <span>·</span>
          <p className="year">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </p>
        </div>

        {/* Overview */}
        <p className="overview">{movie.overview}</p>

        {/* Trailer Section */}
        {trailerKey && !showTrailer && (
          <button
            className="trailer-btn"
            onClick={() => setShowTrailer(true)}
          >
            ▶ Watch Trailer
          </button>
        )}

        {showTrailer && (
          <div className="trailer-video">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
