// src/components/SearchComponent.js
import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = ({ searchQuery, handleSearchChange }) => {
  return (
    <TextField
    placeholder="Search Users..."
    variant="outlined"
    size="small"
    value={searchQuery}
    sx={{ ml: 2 }} style={{ width: '100%' }}
    onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchComponent;