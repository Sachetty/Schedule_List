import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h2``;

export const Search = styled.form`
  display: flex;
  width: 100%;
  height: 40px;
  margin-top: 40px;
  border-bottom: 1px solid #c4c4c4;
  align-items: center;

  @media (min-width: 768px) {
    width: 441px;
  }

  > input {
    width: 100%;
    border: none;
  }

  >input: focus {
    outline: none;
    border: none;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
`;

export const SearchIcon = styled(FaSearch)``;
