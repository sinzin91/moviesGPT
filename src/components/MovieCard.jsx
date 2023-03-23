import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const MovieTitle = styled.p`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: #fff;
`;

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Card>
      <MoviePoster src={posterUrl} alt={movie.title} />
      <MovieTitle>{movie.title}</MovieTitle>
    </Card>
  );
};

export default MovieCard;
