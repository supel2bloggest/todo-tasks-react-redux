import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { 
  CssBaseline, Container, Typography,
  List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
  Avatar, IconButton, Snackbar, Backdrop, CircularProgress,
  Paper, InputBase, Divider
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TimerIcon from '@material-ui/icons/Timer';

import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import actions from './store/actions';

import Header from './components/Header';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 38,
    margin: 4,
  },
  text_center: {
    textAlign: 'center'
  },
  titleContainer: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  listItem: {
    borderBottom: '1 solid #ccc',
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App(props) {
  const classes = useStyles();
  const { loading, open_snack, tasks, onAddTask, onRemoveTask, fetchTasks } = props;
  const [ taskText, setTaskText ] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setTaskText('');
    taskText && onAddTask({ id: (Math.random() + (tasks.length + 1)), name: taskText })
  }

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks]);

  return (
    <>
    <CssBaseline />
    <Header />
    <Container>
      <Typography variant="h4" className={classes.titleContainer} >
        Tasks
      </Typography>
      <Paper component="form" className={classes.paper} onSubmit={onSubmit}>
          <InputBase
            className={classes.input}
            placeholder="Input your todo tasks."
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(e) => setTaskText(e.target.value)}
            value={taskText}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton type="submit" color="primary" className={classes.iconButton} aria-label="directions" >
            <AddIcon />
          </IconButton>
      </Paper>
      <List>
        {
        tasks.length > 0 ? (tasks.map((value, i) => {
        return (
            <ListItem key={i} className={classes.listItem}>
              <ListItemAvatar>
                <Avatar>
                  <TimerIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={(i + 1) + ":" + value.name} 
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => onRemoveTask(value.id)} >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
        );
      })
        ) : (
        <ListItem>
            <ListItemText
              className={classes.text_center}
              primary={"No data please add task to remember your tasks."} 
            />
        </ListItem>
     )
    }
      </List>
      <Snackbar open={open_snack} autoHideDuration={1000}>
        <Alert severity="success">
          Success !
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  </>
  );
}


const mapStateToProps = (state) => {
  const { tasks } = state;
  return {
    loading: tasks.loading,
    tasks: tasks.tasks,
    open_snack: tasks.open_snack
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: () => dispatch(actions.ACTION_TASK.taskFromLocalStorage()),
    onAddTask: (task) => dispatch(actions.ACTION_TASK.addTask(task)),
    onRemoveTask: (id) => dispatch(actions.ACTION_TASK.removeTask(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
