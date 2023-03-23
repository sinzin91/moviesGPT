import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin: 0;
`;

const Subheading = styled.h2`
  font-size: 1.3rem;
  color: #fff;
  margin: 0.5rem 0 0;
  font-weight: normal;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>MoviesGPT</Title>
      <Subheading>Search for movies by what happens in the plot.</Subheading>
    </HeaderContainer>
  );
};

export default Header;
