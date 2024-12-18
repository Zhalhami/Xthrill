import React, { useEffect, useState } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [videoKey, setVideoKey] = useState(null); // For storing the YouTube video key
  const API_KEY = "8b79f6c4a70048f99dde56e4e696b0ae"; // Replace with your TMDb API key
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300"; 
  const [playingMovieId, setPlayingMovieId] = useState(null);


  useEffect(() => {
    // Fetch popular movies
    fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handlePlayVideo = (movieId) => {
    fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        const video = data.results.find((vid) => vid.site === "YouTube" && vid.type === "Trailer");
        if (video) {
          setPlayingMovieId(movieId); // Set the current playing movie
          setVideoKey(video.key); // Store the YouTube video key
        } else {
          alert("No trailer available for this movie.");
        }
      })
      .catch((error) => console.error("Error fetching video:", error));
  };
  

  return (
    <div className="movies">
    <h2 style={{ textAlign: "center" }}>Popular Movies</h2>
    <ul>
        {movies.map((movie) => (
            <li className="eachmovie" key={movie.id}>
                {playingMovieId === movie.id ? (
                    <iframe
                        width="280"
                        height="420"
                        src={`https://www.youtube.com/embed/${videoKey}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div style={{ position: "relative" }}>
                        <img
                            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                            alt={movie.title}
                            style={{ width: "100%" }}
                        />
                        <button
                            onClick={() => handlePlayVideo(movie.id)}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                cursor: "pointer",
                            }}
                        >
                            ▶
                        </button>
                    </div>
                )}
                <h3>{movie.title}</h3>
            </li>
        ))}
    </ul>
</div>

  );
}

export default Movies;
