import React, { useState, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from './Card';
import ColumnHeader from './ColumnHeader'
import TaskBoardHeader from './TaskBoardHeader';
import avatar from '../assets/avatar.svg';
import avatar2 from '../assets/avatar-2.svg';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Assets Imports
import taskIcon from '../assets/task.svg';



const CardContainer = styled(Box)(({ theme }) => ({
  padding: '20px',
  backgroundColor: '#FFF',
  borderRadius: '8px',
  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#f1f1f1',
    boxShadow: '0px 0px 11px 0px #3333',
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Container = styled(Box)({
  padding: '36px',
  backgroundColor: '#F7F8FA',
});

const TaskColumn = styled(forwardRef((props, ref) => <Box ref={ref} {...props} />))`
  padding: 16px;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


const TaskBoard = () => {
  const [data, setData] = useState([
    {
      name: 'Backlog Tasks',
      badge: 5,
      tasks: [
        {
          id: 1,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 2,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 3,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 4,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 5,
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
          id: 6,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 7,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 8,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 9,
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
          id: 10,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 11,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 12,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 13,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 14,
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
          id: 15,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 16,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 17,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 18,
          title: 'Design new website layout',
          labels: ['#UI007', 'Design'],
          avatars: [avatar, avatar2],
          tasks: 4,
          files: 2,
          comments: 3,
        }, {
          id: 19,
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
  ])

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Parse the indices from the droppableIds
    const sourceIndex = parseInt(source.droppableId.replace('col-', ''));
    const destinationIndex = parseInt(destination.droppableId.replace('col-', ''));

    // Deep copy of data
    const newData = JSON.parse(JSON.stringify(data));

    // Remove task from source column
    const [removed] = newData[sourceIndex].tasks.splice(source.index, 1);

    // Add task to destination column
    newData[destinationIndex].tasks.splice(destination.index, 0, removed);

    // Update state
    setData(newData);
  };

  return (
    <Container>
      <TaskBoardHeader />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Grid container spacing={3} style={{
          justifyContent: 'space-between',
          marginTop: 0,
          height: "70vh",
          overflowY: "scroll",
          overflowX: "auto",
          flexWrap: "nowrap"
        }}>
          {data.map((column, index) => (
            <Grid item key={`col-${index}`} style={{ flexShrink: 0, minWidth: '300px' }}>
              <Droppable droppableId={`col-${index}`} key={index}>
                {(provided) => (
                  <TaskColumn
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <ColumnHeader title={column.name} badge={column.badge} />
                    {column.tasks.map((task, taskIndex) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={taskIndex}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card task={task}>
                            </Card>
                            <button style={{ backgroundColor: 'red' }} {...provided.dragHandleProps}>Drag</button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <CardContainer>
                      <Header>
                        <Typography variant="body1" fontWeight="600" color="#1f2633">
                          Add New Task
                        </Typography>
                      </Header>
                    </CardContainer>
                  </TaskColumn>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default TaskBoard;
