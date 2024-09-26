import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Card from './Card';

const Board = () => {
  const tasks = useSelector((state) => state.board.tasks);

  return (
    <Grid container spacing={2}>
      {tasks.map((task, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card task={task} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
