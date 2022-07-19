import React, { useEffect, useState } from 'react';

import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import FakeBook1 from '../../images/name2.png' ;


import useStyles from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const classes=useStyles();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const handleLogOut=()=>{
       
        dispatch({type: 'LOGOUT' })
        navigate('/')
        setUser(null);
       
    }
   
  useEffect(()=>{
    const token=user?.token;
    
    //jwt

    setUser(JSON.parse(localStorage.getItem('profile')));


  },[navigate,user?.token])

    return (

        <AppBar className={classes.appBar}  position="static" color='inherit' >
            <div className={classes.brandContainer}>
              
            <Link to={'/'}>
            <img src={FakeBook1} alt="icon Text" height='45px' />
            </Link>
            
        

           
            </div>
            <Toolbar className={classes.toolbar} >
                {
                    user ? ( 
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result?.displayName} src={user.result?.photoURL}>
                                {user.result?.displayName?.charAt(0)}
                                {user.result?.name?.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant='h5'> {user.result?.displayName} {user.result?.name}</Typography>
                            <Button variant='contained' className={classes.logout} color='secondary' onClick={handleLogOut}> Logout</Button>
                        </div>
                    ) : (
                            <Button component={Link} to='/auth' variant='contained'color='primary'>SignIn</Button>
                    )
                }
            </Toolbar>
        </AppBar>

    );
};

export default Navbar;