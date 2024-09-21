import React, { useState } from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  height: 40px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;


  &:focus {
    outline: none;
    border-color: #28a745;
  }
`;

const Filter = ({ onFilter }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");

  const handleFilter = () => {
    onFilter({ title, rating });
  };

  return (
    <FilterWrapper>
      <Input
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Filter by rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <Button onClick={handleFilter}>Filter</Button>
    </FilterWrapper>
  );
};

export default Filter;
