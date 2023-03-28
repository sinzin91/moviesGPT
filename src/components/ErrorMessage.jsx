import React from "react";
import styled from "styled-components";

const ErrorWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 2rem;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 1.2rem;
`;

const ErrorMessage = ({ message }) => {
  return (
    <ErrorWrapper>
      <ErrorText>{message} 😞</ErrorText>
    </ErrorWrapper>
  );
};

export default ErrorMessage;
