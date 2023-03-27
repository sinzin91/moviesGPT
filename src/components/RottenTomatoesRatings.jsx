import React from 'react';
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1.2rem;
  margin-left: 10px;
`;

const RottenTomatoesRating = ({ rating }) => {
  const emoji = rating < 50 ? '🤢' : '🍅';

  return (
    <RatingContainer>
      {emoji} {rating}%
    </RatingContainer>
  );
};

export default RottenTomatoesRating;
