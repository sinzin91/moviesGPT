import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const MovieGrid = ({ movies }) => {
  return (
    <Grid>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Grid>
  )
};

export default MovieGrid;
