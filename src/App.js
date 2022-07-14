import React from 'react';
import { Container,AppBar,Typography,Grow,Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FakeBook from '../src/images/FakeBook.png'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles'
import { useEffect, useState } from 'react';
import { getPosts } from './actions/posts';

const App = () => {
    const [currentId,setCurrentId]=useState(null);
    const classes=useStyles();
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getPosts());
      }, [ currentId,dispatch]);
    return (
       <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position="static" color='inherit' >
            <Typography className={classes.heading} variant='h2' align='center'>FakeBook <img className={classes.image} src={FakeBook} height="60" alt="main pic" /></Typography>

            </AppBar>
            <Grow in>
                <Container>
                    <Grid
                    className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}></Posts>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                        </Grid>
                    </Grid>

                </Container>
            </Grow>
       </Container>
    );
};

export default App;