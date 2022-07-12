import React from 'react';
import useStyles from './styles'
import { TextField,Button,Typography,Paper } from '@material-ui/core';


const Form = () => {
    const classes=useStyles();
    const handleSubmit=()=>{

    }
    return (
        <div>
             <Paper className={classes.paper}>
                <Form autoComplete='off' noValidate className={classes.form} onSubmit={handleSubmit}>

                </Form>

             </Paper>
        </div>
    );
};

export default Form;