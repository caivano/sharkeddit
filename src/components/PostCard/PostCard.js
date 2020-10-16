import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardActions, CardContent, IconButton, makeStyles, Typography } from '@material-ui/core';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { IconWrapper } from './styled'
import { goToPost } from '../../routes/Coordinator';
import useProtectedPage from '../../hooks/useProtectedPage';
import { sendVote } from '../../services/votes'

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '10px',
    },
    content: {
        '&:hover':{
            cursor: 'pointer',
        }
    },
    action: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    comment: {
        marginRight: '8px',
    }
}))

const PostCard = (props) => {
    const { username, postTitle, postText, votesCount, commentsCount, postId, createdAt } = props
    const [voteDirection, setVoteDirection] = useState(0)
    const [votesCountFront, setVotesCountFront] = useState(votesCount)
    const classes = useStyles();
    const history = useHistory();

    useProtectedPage();
    
    const voteHandler = (id, type) => {
        if(voteDirection === 0 || voteDirection !== type){
            if(voteDirection === 0) {
                setVotesCountFront(votesCountFront + type)
            } else if (voteDirection > 0){
                setVotesCountFront(votesCountFront - 2)
            } else {
                setVotesCountFront(votesCountFront + 2)
            }
            setVoteDirection(type)
            sendVote(id, type)
        } else if (voteDirection === type){
            setVotesCountFront(votesCountFront - type)
            setVoteDirection(0)
            sendVote(id, 0)
        } else {
            console.log('something went wrong')
        }
    }

    return ( 
        <Card className={classes.root}>
            <CardContent className={classes.content} onClick={() => goToPost(history, postId)}>
                <Typography variant="caption" color="textSecondary" gutterBottom>
                    Posted by {username} {createdAt}
                </Typography>
                <Typography variant="body1" component="p" color="secondary" gutterBottom>
                    {postTitle}
                </Typography>
                <Typography variant="body2" component="p">
                    {postText}
                </Typography>
            </CardContent>
            <CardActions className={classes.action}>
                <IconWrapper>
                    <IconButton aria-label="voto positivo" onClick={() => voteHandler(postId, 1)} data-testid='positive-vote'>
                        <AddBoxIcon/>
                    </IconButton>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {votesCountFront}
                    </Typography>
                    <IconButton aria-label="voto negativo" onClick={() => voteHandler(postId, -1)}>
                        <IndeterminateCheckBoxIcon/>
                    </IconButton>
                </IconWrapper>
                <Typography variant={"button"} className={classes.comment}>{commentsCount} {commentsCount === 1 ? <>comentário</> : <>comentários</>}</Typography>
            </CardActions>
        </Card>
     );
}
 
export default PostCard;
