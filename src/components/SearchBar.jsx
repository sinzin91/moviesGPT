import React from "react";
import TextField from "@mui/material/TextField";
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

const SearchInput = styled(TextField)`
  width: 80%;

  .MuiInputBase-input {
    color: #fff;
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: #333;
    }
    &:hover fieldset {
      border-color: #444;
    }
    &.Mui-focused fieldset {
      border-color: #444;
    }
  }

  .MuiOutlinedInput-multiline {
    padding: 0;
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchButtonClick();
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        multiline
        maxRows={4}
        variant="outlined"
        placeholder="Search for movies by plot..."
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        InputProps={{ style: { backgroundColor: "#333" } }}
      />
      <SearchButton onClick={onSearchButtonClick}>Search</SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
