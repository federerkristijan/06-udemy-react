import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // an alternative to .then blocks is
  async function fetchMoviesHandler() {
    setIsLoading(true);
     const response = await fetch('https://swapi.dev/api/films/')
     const data = await response.json();

  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/')
  //     .then((response) => {
  //       // transforms json data into JS object
  //       return response.json();
  //     })
      // .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
      // });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* if the data is not loading, i.e .finished loading, show movies list */}
        {!isLoading && <MoviesList movies={movies} /> }
        {!isLoading && movies.length === 0 && <p>No movies to show.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
