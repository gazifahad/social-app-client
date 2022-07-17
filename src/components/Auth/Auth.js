import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';

import React, { useState } from 'react';
import useStyles from './styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input'

import Icon from './Icon';

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signin,signup} from '../../actions/auth'
const initialState={firstName:'',lastName:'',email:'',password: '',confirmPassword:''}

const Auth = () => {
    const navigate=useNavigate()
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    // console.log(user?.user.displayName);
   
    const dispatch=useDispatch();
   
    const [showPassword,setShowPassword]=useState(false);
    const [isSignup,setIsSignUp]=useState(true);
    const [formData,setFormData]=useState(initialState)
    const classes = useStyles();
   
    const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)
    const handleChange = (e) => {
            setFormData({...formData,[e.target.name]:e.target.value})
    };
    const handleSubmit = (event) => {
        event.preventDefault();
       if(isSignup){
            dispatch(signup(formData,navigate))
       }
       else{
        dispatch(signin(formData,navigate))
       }
    };
   const handleGoogleLogin=async(user)=>{
    await signInWithGoogle();
  
    }
    if(user){
        
        const result=  (user?.user);
    
        const token=result?.accessToken;
        console.log(result);
       
       try {
          dispatch({type: "AUTH", data: {result,token}});
          
          navigate('/');
       } catch (error) {
           console.log(error);
       }
     }
 

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{
                    isSignup ? 'Sign Up' : "Sign In"
                }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (<>

                                <Input name='firstName' label='First Name' handleChange={handleChange}
                                    autoFocus
                                    half />


                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />

                            </>)

                        }

                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup &&  <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='passeord'  handleShowPassword={handleShowPassword} />}
                    </Grid>
                    
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup ? 'Sign Up': 'Sign In'}</Button>
                   
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={handleGoogleLogin}  startIcon={<Icon/>} variant='contained'>Login with Google</Button>
                      
                 
                    {
                        isSignup? <>Already have an account? <Button onClick={()=>setIsSignUp(false)}>Sign In</Button></> :<> Do not have an account? <Button onClick={()=>setIsSignUp(true)}>Sign up</Button></>
                    }
                    

                </form>

            </Paper>

        </Container>
    );
};

export default Auth;