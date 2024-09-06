import { useState, useContext } from "react";
import { MovieContext } from "./MovieContext";
import styled from "styled-components";
import axiosInstance from "../utils/axiosInstance";

const Button = styled.button`
  height: 30px;
  background-color: green;
`;

const Input = styled.input`
  margin: 5px;
  padding: 5px;
  border-radius: 8px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

// Simplified URL validation regex
const isValidURL = (url) => /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(url);

const AddMovie = () => {
  const { addMovie } = useContext(MovieContext);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "",
    trailerURL: "", // Ensure the field names are correct
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (
      !newMovie.title ||
      !newMovie.description ||
      !newMovie.rating ||
      !newMovie.trailerURL
    ) {
      setError("All fields are required.");
      return;
    }

    if (!isValidURL(newMovie.posterURL) || !isValidURL(newMovie.trailerURL)) {
      setError("Please provide valid URLs.");
      return;
    }

    try {
      // If all validations pass, add the movie using axios
      await axiosInstance.post("/movies", newMovie);
      // Assuming addMovie is meant for local state updates, you can still use it if needed
      if (addMovie) addMovie(newMovie);
      setNewMovie({
        title: "",
        description: "",
        posterURL: "",
        rating: "",
        trailerURL: "", // Reset field
      });
      setError("");
    } catch (err) {
      setError("Error adding movie: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={newMovie.title}
        onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Description"
        value={newMovie.description}
        onChange={(e) =>
          setNewMovie({ ...newMovie, description: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Poster URL"
        value={newMovie.posterURL}
        onChange={(e) =>
          setNewMovie({ ...newMovie, posterURL: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Rating"
        value={newMovie.rating}
        onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Trailer URL"
        value={newMovie.trailerURL}
        onChange={(e) =>
          setNewMovie({ ...newMovie, trailerURL: e.target.value })
        }
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit">Add Movie</Button>
    </form>
  );
};

export default AddMovie;
