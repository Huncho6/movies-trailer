import styled from 'styled-components';
import { useContext } from 'react'; 
import MovieCard from './MovieCard';
import { MovieContext } from './MovieContext'; 

const Wrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const MovieList = () => {
  const { movies } = useContext(MovieContext);

  return (
    <Wrapper>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Wrapper>
  )
}

export default MovieList;
