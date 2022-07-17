import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



const Input = ({name, half, handleChange ,type,label,autoFocus,handleShowPassword}) => {
    return (
     
            <Grid item xs={12} sm={half ? 6 : 12}>
                <TextField
                name={name}
                onChange={handleChange}
                variant='outlined'
                required
                
                label={label}
                autoFocus={autoFocus}
                type={type}
                fullWidth
                InputProps={name==='password' ? {
                endAdornment:(
                    <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                        {
                            type ==='password'?<Visibility/>: <VisibilityOff/>
                        }
                    </IconButton>
                    </InputAdornment>
                ),
            } : null
            } 

                />
            </Grid>
    
    );
};

export default Input;