import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 0.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  &:focus {
    outline: none;
    background-color: #444;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: #0077b6;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #0096c7;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const SearchBar = ({ setSearchTerm, onSearchButtonClick }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Search for movies by plot..."
        onChange={handleInputChange}
      />
      <SearchButton onClick={onSearchButtonClick}>Search</SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
