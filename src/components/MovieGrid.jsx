import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
  grid-gap: 2rem;
  width: 100%;
  margin-top: 4rem;
  max-width: 1200px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MovieGrid = ({ movies }) => {
  return (
    <Grid>
      {movies.map((movie, index) => (
        <MovieCard key={`${movie.id}-${index}`} movie={movie} />
      ))}
    </Grid>
  );
};

export default MovieGrid;
