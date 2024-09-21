import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  
  
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Poster = styled.img`
  width: 220px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
`;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/movie/${movie._id}`);
  };

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <CardContainer>
      <Poster src={movie.posterURL} alt={movie.title} />
      <Title>{movie.title}</Title>
      <div>Rating: {movie.rating}</div>
      <button onClick={handleNavigate}>Check It Out</button>
    </CardContainer>
  );
};

export default MovieCard;
