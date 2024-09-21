import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../utils/axiosInstance';

const DetailContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const Poster = styled.img`
  width: 320px;
  height: 480px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
  color: #666;
  margin-bottom: 20px;
`;

const Trailer = styled.iframe`
  width: 100%;
  height: 360px;
  max-width: 640px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: none;
`;

const embedUrl = (url) => {
  if (url.includes('youtu.be')) {
    return url.replace('youtu.be/', 'www.youtube.com/embed/');
  } else if (url.includes('watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  return url;
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axiosInstance.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <DetailContainer>
      <Poster src={movie.posterURL} alt={movie.title} />
      <Title>{movie.title}</Title>
      <Description>{movie.description}</Description>
      {movie.trailerURL ? (
        <Trailer
          src={embedUrl(movie.trailerURL)}
          title={movie.title}
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <p>No trailer available</p>
      )}
      <Link to="/">Back to Home</Link>
    </DetailContainer>
  );
};

export default MovieDetail;
