import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" noWrap>
          To-Do Board
        </Typography>
        <SearchContainer>
          <IconButton size="large">
            <SearchIcon />
          </IconButton>
          <StyledInputBase placeholder="Search…" />
        </SearchContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
