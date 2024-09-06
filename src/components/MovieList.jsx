import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import MovieCard from "./MovieCard";
import Filter from "./Filter"; // Import Filter component

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/movies");
        if (response.status === 200) {
          const fetchedMovies = response.data|| [];
          setMovies(fetchedMovies);
          setFilteredMovies(fetchedMovies); // Initialize filtered movies
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleFilter = (filters) => {
    const { title, rating } = filters;
    const filtered = movies.filter((movie) => {
      const matchesTitle = title
        ? movie.title.toLowerCase().includes(title.toLowerCase())
        : true;
      const matchesRating = rating ? movie.rating >= Number(rating) : true;
      return matchesTitle && matchesRating;
    });
    setFilteredMovies(filtered);
  };

  return (
    <div>
      <Filter onFilter={handleFilter} />
      <div>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
