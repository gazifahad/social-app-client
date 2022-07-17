import React from 'react';

import Form from './../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';

import {useNavigate,useLocation} from 'react-router-dom'
import useStyles from './styles'
import { useEffect, useState } from 'react';
import { getPosts } from '../../actions/posts';

import Paginate from './../Pagination';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'



function useQuery(){
    return new URLSearchParams(useLocation().search)
}
const Home = () => {
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState('');
    const [currentId,setCurrentId]=useState(null);
    const classes=useStyles();
    const dispatch=useDispatch();
   
    const query=useQuery();
    const navigate=useNavigate();
    const page=query.get('page') || 1;
    const searchQuery=query.get('searchquery');
    useEffect(() => {
       
        dispatch(getPosts());
      }, [ currentId,dispatch]);
      const handleKeyPress=(e)=>{
        if(e.keyCode===13){
            //search post
        }
      };
      const handleAdd=(tag)=>
        setTags([...tags,tag]);
      
      const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag !== tagToDelete))
     
      
    return (
        <Grow in>
        <Container maxWidth='xl'>
            <Grid
           container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}></Posts>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                        <TextField name='search' variant='outlined' label='Search Posts'
                        fullWidth
                        
                        onKeyPress={handleKeyPress}
                        onChange={(e)=>{setSearch(e.target.value)}} />
                        <ChipInput
                        style={{margin:"10px 0"}}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label='search by tags'
                        variant='outlined'
                        />


                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                    <Paper elevation={6}>
                        <Paginate></Paginate>

                    </Paper>
                </Grid>
            </Grid>

        </Container>
    </Grow>
    );
};

export default Home;