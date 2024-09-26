import React from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from './Card';
import ColumnHeader from './ColumnHeader'
import TaskBoardHeader from './TaskBoardHeader';
import avatar from '../assets/avatar.svg';
import avatar2 from '../assets/avatar-2.svg';

// Mock Data
const data = [
  {
    name: 'Backlog Tasks',
    badge: 5,
    tasks: [
      {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      },
      // Additional tasks...
    ],
  },
  {
    name: 'To Do Tasks',
    badge: 3,
    tasks: [
      {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      },
      // Additional tasks...
    ],
  }, {
    name: 'In Process',
    badge: 5,
    tasks: [
      {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      },
      // Additional tasks...
    ],
  }, {
    name: 'Done',
    badge: 5,
    tasks: [
      {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      }, {
        title: 'Design new website layout',
        labels: ['#UI007', 'Design'],
        avatars: [avatar, avatar2],
        tasks: 4,
        files: 2,
        comments: 3,
      },
      // Additional tasks...
    ],
  },
  // Additional columns...
];

const Container = styled(Box)({
  padding: '36px',
  backgroundColor: '#F7F8FA',
});

const TaskColumn = styled(Box)({
  padding: '16px',
  borderRadius: '8px',
  width: '300px',
});


const TaskBoard = () => {
  return (
    <Container>
      <TaskBoardHeader />
      <Grid container spacing={3} style={{
        justifyContent: 'space-between', marginTop: 0,
        height: "70vh",
        overflowY: "scroll"
      }}>
        {data.map((column, colIndex) => (
          <TaskColumn key={`col-${colIndex}`} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <ColumnHeader title={column.name} badge={column.badge} />
            {column.tasks.map((task, taskIndex) => (
              <Card task={task} />
            ))}
          </TaskColumn>
        ))}
      </Grid>
    </Container>
  );
};

export default TaskBoard;
