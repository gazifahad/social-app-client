import React from 'react';

import Form from './../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';

import {useNavigate,useLocation} from 'react-router-dom'
import useStyles from './styles'
import { useEffect, useState } from 'react';
import { getPosts,getPostsBySearch } from '../../actions/posts';

import Paginate from './../Pagination';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'



function useQuery(){
    return new URLSearchParams(useLocation().search)
}
const Home = () => {
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);
    const [currentId,setCurrentId]=useState(null);
    const classes=useStyles();
    const dispatch=useDispatch();
   
    const query=useQuery();
    const navigate=useNavigate();
    const page=query.get('page') || 1;
    const searchQuery=query.get('searchquery');
   
     
      const searchPost=()=>{
        if(search.trim() || tags){
           dispatch(getPostsBySearch({search,tags:tags.join(',') })) ;
           navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }
        else{
           navigate('/')
        }
      }
      const handleKeyPress=(e)=>{
        if(e.keyCode===13){
            searchPost();
        }
      };
      const handleAdd=(tag)=>
        setTags([...tags,tag]);
      
      const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag !== tagToDelete))
     
      
    return (
        <Grow in>
        <Container maxWidth='xl'>
            <Grid
           container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
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
                        <Button onClick={searchPost} className={classes.searchButton}
                        variant='contained'>Search</Button>


                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}></Form>

                    {(!searchQuery && !tags.length) && (<Paper elevation={6} className={classes.pagination}>
                       
                       <Paginate page={page}></Paginate>

                   </Paper>) }
                   
                </Grid>
            </Grid>

        </Container>
    </Grow>
    );
};

export default Home;