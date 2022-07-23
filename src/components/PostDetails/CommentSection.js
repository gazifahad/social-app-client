import React, { useRef, useState } from 'react';
import { Typography, TextField } from '@mui/material';
import {commentPost} from '../../actions/posts'
import useStyles from './styles';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
const CommentSection = ({ post }) => {
    const user=JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    
    const dispatch=useDispatch();
    const [comments, setComments] = useState([post?.comments]);
    const classes = useStyles();
    const commentsRef=useRef();
    console.log(comments);
  
   

   
   
    const handleClick = async () => {
        
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        setComment('');
        setComments(newComments);

        commentsRef.current.scrollIntoView({behavior: "smooth"});
    };
    
// comments.map((c)=>console.log( "type of c is",typeof(c).toString()) );
console.log(comments);

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>
                        Comments
                    </Typography>
                    {comments.length>0 &&
                       <>   {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                          <strong>{c?.toString().split(": ")[0]} </strong>
                          {c?.toString().split(": ")[1]}
                        </Typography>
                        ))}
                        </>
                    }
                      <div ref={commentsRef}></div>
                 
                </div>
              
                {user?.result && <div style={{width:'70%'}}>
                <Typography gutterBottom variant='h6'>
                        write a comment
                    </Typography>
                    <TextField 
                    fullWidth
                    rows={2}
                    variant="outlined"
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    />
                    <Button
                    color='primary'
                    style={{marginTop:'10px'}} fullWidth disabled={!comment} variant="contained" onClick={handleClick}
                    
                    >
                            Comment
                    </Button>
                     </div> }
                
            </div>
            
        </div>
    );
};

export default CommentSection;