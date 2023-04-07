import React, { useState } from "react";
import styled from "styled-components";
import Stars from "./Stars";
import RottenTomatoesRating from "./RottenTomatoesRatings";
import ProviderList from "./ProviderList";

const Card = styled.div`
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(51, 51, 51, 0.85);
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  padding: 1rem;
  box-sizing: border-box;
  z-index: 1;
`;

const OverlayText = styled.p`
  margin: 0.5rem 0;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const MovieCard = ({ movie }) => {
  const {
    title,
    poster_path,
    vote_average,
    release_date,
    overview,
    vote_count,
    rottenTomatoesScore,
    watchProviders,
  } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w300${poster_path}`;

  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const hideOverlay = (e) => {
    e.stopPropagation();
    setOverlayVisible(false);
  };

  return (
    <Card onClick={toggleOverlay}>
      <Image src={imageUrl} alt={title} />
      <Title>{title}</Title>
      <RatingContainer>
        <Stars vote_average={vote_average} alignCenter />
        <RottenTomatoesRating rating={rottenTomatoesScore} />
      </RatingContainer>
      {overlayVisible && (
        <Overlay onClick={hideOverlay}>
          <h2>{title}</h2>
          <Stars vote_average={vote_average} />
          <RottenTomatoesRating rating={rottenTomatoesScore} />
          <OverlayText>
            <b>Ratings:</b> {vote_count}
          </OverlayText>
          <OverlayText>
            <b>Release Date:</b> {release_date}
          </OverlayText>
          <OverlayText>{overview}</OverlayText>
          <ProviderList watchProviders={watchProviders}/>
        </Overlay>
      )}
    </Card>
  );
};

export default MovieCard;
