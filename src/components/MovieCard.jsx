import React from "react";
import styled from "styled-components";
import Stars from "./Stars";

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
  const { title, poster_path, vote_average } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Card>
      <MoviePoster src={posterUrl} alt={title} />
      <MovieTitle>{title}</MovieTitle>
      <Stars vote_average={vote_average} />
    </Card>
  );
};

export default MovieCard;
