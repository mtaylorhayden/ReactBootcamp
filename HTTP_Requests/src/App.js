import MoviesList from "./components/MoviesList";
import "./App.css";
import React, { useState } from "react";
import PeopleList from "./components/PeoplesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [people, setPeoples] = useState([]);

  function fetchMoviesHandler() {
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovieList = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseData: movieData.release_data,
          };
        });
        setMovies(transformedMovieList);
      });
  }

  function fetchPeopleHandler() {
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
        <MoviesList movies={movies} />
        <PeopleList people={people} />
      </section>
    </React.Fragment>
  );
}

export default App;
