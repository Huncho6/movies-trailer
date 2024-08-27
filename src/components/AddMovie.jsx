import { useState, useContext } from 'react';
import { MovieContext } from './MovieContext'; 
import styled from 'styled-components';

const Button = styled.button`
height: 30px;
background-color: green;
`
const Input = styled.input`
  margin: 5px;
  padding: 5px;
  border-radius: 8px;
`;

const AddMovie = () => {
  const { addMovie } = useContext(MovieContext);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(newMovie);
    setNewMovie({
      title: '',
      description: '',
      posterURL: '',
      rating: '',
    });
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
        onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Poster URL"
        value={newMovie.posterURL}
        onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Rating"
        value={newMovie.rating}
        onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
      />
      <Button type="submit">Add Movie</Button>
    </form>
  );
};

export default AddMovie;
