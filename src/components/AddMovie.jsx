import { useState, useContext } from "react";
import { MovieContext } from "./MovieContext";
import styled from "styled-components";
import axiosInstance from "../utils/axiosInstance";

// Styled components
const Button = styled.button`
  height: 40px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Modal backdrop */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
`;

const CloseButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #28a745;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0;
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
    trailerURL: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control the modal

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      await axiosInstance.post("/movies", newMovie);
      if (addMovie) addMovie(newMovie);
      setNewMovie({
        title: "",
        description: "",
        posterURL: "",
        rating: "",
        trailerURL: "",
      });
      setError("");
      setShowModal(false); // Close modal on success
    } catch (err) {
      setError("Error adding movie: " + err.message);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Add Movie</Button> {/* Show modal when clicked */}
      
      {showModal && (
        <ModalWrapper>
          <ModalContainer>
            <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
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
                onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Poster URL"
                value={newMovie.posterURL}
                onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })}
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
                onChange={(e) => setNewMovie({ ...newMovie, trailerURL: e.target.value })}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Button type="submit">Add Movie</Button>
            </form>
          </ModalContainer>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddMovie;
