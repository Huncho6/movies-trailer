import React, { createContext, useState } from "react";

export const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const [filter, setFilter] = useState({ title: "", rating: "" });

  const filteredMovies = movies.filter(movie => {
    return (
      movie.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      (filter.rating ? movie.rating >= parseFloat(filter.rating) : true)
    );
  });

  const addMovie = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <MovieContext.Provider value={{ movies: filteredMovies, addMovie, updateFilter }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
