import styled from "styled-components";


export const StyledForm = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 6rem auto;
  h2 {
    margin-bottom: 1rem;
    font-weight: 900;
    font-size: 30px;
  }
  button,
  input {
    height: 50px;
    width: 100%;
    padding: 8px;
    outline: none;
    border-radius: 10px;
    border: 1px solid rgb(220, 220, 220);
    margin-bottom: 1rem;
    &:focus {
      border: 1px solid rgb(0, 208, 255);
    }
  }
  button {
    font-weight: 900;
    background-color: #32CD32;
    cursor: pointer;
    &:focus {
      border: none;
    }
  }
  p {
    font-weight: 900;
    font-size: 18px;
    color: red;
  }
`;