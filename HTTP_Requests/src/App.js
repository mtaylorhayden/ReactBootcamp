import MoviesList from "./components/MoviesList";
import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import PeopleList from "./components/PeoplesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [people, setPeoples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
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
      setPeoples([]);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

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
        setMovies([]);
        setIsLoading(false);
      });
  }

  let content = <p>No people or movies found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (people.length > 0) {
    content = <PeopleList people={people} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={fetchPeopleHandler}>Fetch People</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
