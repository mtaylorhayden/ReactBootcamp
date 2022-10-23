import MoviesList from "./components/MoviesList";
import "./App.css";
import React, { useState } from "react";
import PeopleList from "./components/PeoplesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [people, setPeoples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong here");
      }

      const data = await response.json();

      const transformedMovieList = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_data,
        };
      });
      setMovies(transformedMovieList);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  function fetchPeopleHandler() {
    setIsLoading(true);
    fetch("https://swapi.dev/api/people/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedPeople = data.results.map((peopleData) => {
          return {
            id: Math.random(),
            name: peopleData.name,
            height: peopleData.height,
            weight: peopleData.mass,
          };
        });
        setPeoples(transformedPeople);
        setIsLoading(false);
      });
  }

  console.log(people);
  console.log(movies);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={fetchPeopleHandler}>Fetch People</button>
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && people.length > 0 && <PeopleList people={people} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found.</p>}
        {!isLoading && people.length === 0 && !error && <p>No people found.</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
