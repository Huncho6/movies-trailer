import React, { useState } from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  height: 35px;
  background-color: green;
  color: white;
  border: none;
  padding: 0 15px;
  cursor: pointer;
  border-radius: 5px;
`;

const Input = styled.input`
  margin-right: 10px;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #ccc;
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
