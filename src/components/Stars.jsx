import React from "react";
import styled from "styled-components";

const StarsContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.alignCenter ? "center" : "flex-start")};
`;

const Star = styled.span`
  font-size: 1.2rem;
  color: ${(props) => (props.active ? "#ffc107" : "#ccc")};
  margin-right: 0.1rem;
`;

const Stars = ({ vote_average, alignCenter }) => {
  const starsCount = Math.round(vote_average / 2);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star key={i} active={i <= starsCount}>
        ★
      </Star>
    );
  }

  return <StarsContainer alignCenter={alignCenter}>{stars}</StarsContainer>;
};

export default Stars;
