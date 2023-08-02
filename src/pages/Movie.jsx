import MovieDisplay from '../components/MovieDisplay'
import React, { useState, useEffect } from 'react';

function Movie() {
  const [movies, setMovies] = useState([]); // Declare a state variable for the movies data and a function to update it

  useEffect(() => {
    async function fetchMovies() {
      // Fetch data from the API
      const apiKey = "";
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
      );
      const data = await res.json();

      setMovies(data.results); // Update the movies state with the fetched data
    }

    fetchMovies();
  }, []); // The empty array ensures that the effect only runs once, when the component mounts

  return (
    <div className="fragment">
    <div id="all_but_footer">
    <div id="content">
    <MovieDisplay movie={movies}/>
    </div></div></div>
  );
}

export default Movie;

