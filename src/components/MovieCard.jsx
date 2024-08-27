import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PostalUrl = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const MovieCard = ({ movie }) => {

  if (!movie) {
    return <div>Movie not found</div>; // Error handling for when movie is not defined
  }

  return (
    <CardContainer>
      <PostalUrl src={movie.posterURL} alt={movie.title} />
      <Title>{movie.title}</Title>
      <Description>{movie.description}</Description>
      <div>{movie.rating}</div>
    </CardContainer>
  );
};

export default MovieCard;
