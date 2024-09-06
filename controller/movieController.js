// controllers/movieController.js
const Movie = require("../models/movieModel");
const { validationResult } = require("express-validator");

// Function to handle adding a movie
exports.addMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, posterURL, rating, trailerURL } = req.body;

  try {
    // Create a new Movie document
    const movie = new Movie({
      title,
      description,
      posterURL,
      rating,
      trailerURL,
    });

    // Save the movie to the database
    const savedMovie = await movie.save();

    res.status(201).json({
      message: "Movie added successfully",
      movieId: savedMovie._id,
    });
  } catch (err) {
    console.error("Error inserting movie:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Function to handle fetching all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getMoviesById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.send(movie);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const updateData = req.body;
    const movie = await Movie.findByIdAndUpdate(movieId, updateData, {
      new: true,
    });

    if (!movie) {
      return res.status(404).send({
        status: "error",
        message: "movie not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle deleting a movie by its ID
exports.deleteMovie = async (req, res) => {
  try {
    // Find the movie by ID and delete it
    const result = await Movie.findByIdAndDelete(req.params.id);

    // If no movie is found, return a 404 response
    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("Error deleting movie:", err.message);
    res.status(500).json({ error: err.message });
  }
};
