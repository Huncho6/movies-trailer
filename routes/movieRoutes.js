// routes/movieRoutes.js
const express = require("express");
const { body } = require("express-validator");
const movieController = require("../controller/movieController");

const router = express.Router();

// Route to add a movie
router.post(
  "/movies",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("posterURL").isURL().withMessage("Invalid URL for Poster"),
    body("rating").isNumeric().withMessage("Rating must be a number"),
    body("trailerURL").isURL().withMessage("Invalid URL for Trailer"),
  ],
  movieController.addMovie
);

// Route to get all movies
router.get("/movies", movieController.getMovies);
router.get("/movies/:id", movieController.getMoviesById);
router.put("/movies/:id", movieController.updateMovie);
router.delete("/movies/:id", movieController.deleteMovie);
module.exports = router;
