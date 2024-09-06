import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../utils/axiosInstance';

const DetailContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-bottom: 20px;
  text-align: center;
`;

const Trailer = styled.iframe`
  width: 560px;
  height: 315px;
  margin-bottom: 20px;
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

      {/* Embed trailer if available */}
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
