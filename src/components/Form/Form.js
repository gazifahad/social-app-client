import React, { useEffect } from 'react';
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

// have to get the id of current post for editing 

const Form = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const classes = useStyles();
    const handleSubmit = (event) => {
        event.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));

        }

        else {
            dispatch(createPost(postData));

        }

        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: '', title: '', message: '', tags: '', selectedFile: ''
        });

    }
    return (
        <div>
            <Paper className={classes.paper}>
                <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                    <Typography variant='h6'>{currentId ? 'editing' : "creating"} a post </Typography>
                    <TextField name='creator' variant='outlined' label="Creator"
                        fullWidth
                        value={postData.creator}
                        onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                    <TextField name='title' variant='outlined' label="title"
                        fullWidth
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField name='message' variant='outlined' label="message"
                        fullWidth
                        value={postData.message}
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <TextField name='tags' variant='outlined' label="Tags"
                        fullWidth
                        value={postData.tags}
                        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                    <div className={classes.fileInput}></div>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    >

                    </FileBase>
                    <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                    <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth> Clear</Button>

                </form>

            </Paper>
        </div>
    );
};

export default Form;