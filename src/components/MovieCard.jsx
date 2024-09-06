import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Poster = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/movie/${movie._id}`); // Use '/movie/' instead of '/MovieDetail/'
  };
  

  if (!movie) {
    return <div>Movie not found</div>; // Error handling for when movie is not defined
  }

  return (
    <CardContainer>
      <Poster src={movie.posterURL} alt={movie.title} />
      <Title>{movie.title}</Title>
      <div>Rating:{movie.rating}</div>
      <button onClick={handleNavigate}>Check It Out</button>
    </CardContainer>
  );
};

export default MovieCard;
