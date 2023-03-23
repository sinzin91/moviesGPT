import React from "react";
import styled from "styled-components";

const StarsContainer = styled.div`
  display: flex;
`;

const Star = styled.span`
  font-size: 1.2rem;
  color: ${(props) => (props.active ? "#ffc107" : "#ccc")};
  margin-right: 0.1rem;
`;

const Stars = ({ vote_average }) => {
  const starsCount = Math.round(vote_average / 2);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<Star key={i} active={i <= starsCount}>★</Star>);
  }

  return <StarsContainer>{stars}</StarsContainer>;
};

export default Stars;
