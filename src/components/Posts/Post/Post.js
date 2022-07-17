import React from 'react';
import { Card, CardActins, CardContent, CardMedia, Button, Typography } from '@material-ui/core';


import useStyles from './Styles'
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const user=JSON.parse(localStorage.getItem('profile'));

const Post = ({ post,setCurrentId }) => {
    
    const dispatch=useDispatch();
    const classes = useStyles();
    const Likes = () => {
        
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.uid || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
            
        }
        
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
     
    
    
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
             title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>

            </div>
            <div className={classes.overlay2}>
            {
                        (user?.result?.uid === post?.creator ||user?.result?._id === post?.creator)&&
                <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id)}>
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
                <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary' 
                    disbaled={`${!user?.result}`}
                    onClick={()=>dispatch(likePost(post._id))}> 
                    <Likes/>
                    
                    </Button>

                    {
                        (user?.result?.uid=== post?.creator ||user?.result?._id=== post?.creator)&&
                    <Button size='small' color='primary' onClick={()=>dispatch(deletePost(post._id))}> 
                    <DeleteIcon/>
                    Delete
                    </Button>
                    }
                </CardActions>
        </Card>
    );
};

export default Post;