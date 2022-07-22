import React, { useState } from 'react';
import { Card,  CardContent, CardMedia, Button, Typography,ButtonBase } from '@material-ui/core';


import useStyles from './Styles'
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deletePost, getPost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';



const user=JSON.parse(localStorage.getItem('profile'))

const Post = ({ post,setCurrentId }) => {
    const navigate=useNavigate();
    const [likes,setLikes]=useState(post?.likes);
    const dispatch=useDispatch();
    const classes = useStyles();
    const userId=user?.result?.uid || user?.result?._id;
    const hasLikedPost=likes.find((like) => like === userId);
    
    const handleLike=async ()=>{
     dispatch(likePost(post._id));
    if(hasLikedPost){
            setLikes(likes.filter((id)=>id!==userId) );
    }
    else{
            setLikes([...likes, userId]);
    }
    };
    const Likes = () => {
        
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
            
        }
        // console.log(post);
        // console.log(user);
       
        
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
      const openPost=()=>{
      navigate(`/posts/${post._id}`)
      }
     const handleDelete=(id)=>{
        const confirmation=window.confirm('Do you really want to delete this post?')
       if(confirmation){
        dispatch(deletePost(id));
       }
       else{
        alert('Operation aborted')
       }
     }
    
    
    return (
        <Card className={classes.card} raised elevation={8}>
            <ButtonBase className={classes.cardAction}
            onClick={openPost}>
            
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
             title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name ? post.name : user?.result?.displayName}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>

            </div>
            <div className={classes.overlay2}>
            {
                        (user?.result?.uid === post?.creator ||user?.result?._id === post?.creator)&&
                <Button style={{ color: 'white',zIndex:"100"}} size='small' onClick={(e) =>{
                    e.stopPropagation();
                    setCurrentId(post._id)
                }}>
                    <MoreHorizIcon fontSize='default' />
                </Button>
}
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'> {
                    post.tags.map(tag=> `#${tag} `)
                }</Typography>
              

            </div>
            <CardContent>
            <Typography className={classes.title} variant='h5' gutterBottom> {
                    post.title
                }</Typography>
                <Typography variant='body2' color='secondary' component='p' gutterBottom> {
                    post.message
                }</Typography>
              
                </CardContent>
                </ButtonBase>
                <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary' 
                    disbaled={`${!user?.result}`}
                    onClick={handleLike}> 
                    <Likes/>
                    
                    </Button>

                    {
                        (user?.result?.uid=== post?.creator ||user?.result?._id=== post?.creator)&&
                    <Button size='small' color='primary' onClick={()=>handleDelete(post._id)
                    }> 
                    <DeleteIcon/>
                    Delete
                    </Button>
                    }
                </CardActions>
        </Card>
    );
};

export default Post;