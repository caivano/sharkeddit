import React, { useState } from 'react';
import { CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { IconWrapper } from '../../components/PostCard/styled';
import { sendCommentVote } from '../../services/votes'

const CommentBox = (props) => {
    const {id, username, text, votesCount, postId, createdAt} = props
    const [voteDirection, setVoteDirection] = useState(0)
    const [votesCountFront, setVotesCountFront] = useState(votesCount)

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
            sendCommentVote(postId, id, type)
        } else if (voteDirection === type){
            setVotesCountFront(votesCountFront - type)
            setVoteDirection(0)
            sendCommentVote(postId, id, 0)
        } else {
            console.log('something went wrong')
        }
    }

    return ( 
        <CardContent>
            <Typography variant={'caption'} color={'textSecondary'} component={'p'}>
                Comment from {username} {createdAt}
            </Typography>
            <Typography variant={'body2'} color={'textPrimary'} component={'p'}>
                {text}
            </Typography>
            <CardActions>
                <IconWrapper>
                    <IconButton aria-label="voto positivo" onClick={() => voteHandler(id, 1)}>
                        <AddBoxIcon/>
                    </IconButton>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {votesCountFront}
                    </Typography>
                    <IconButton aria-label="voto negativo" onClick={() => voteHandler(id, -1)}>
                        <IndeterminateCheckBoxIcon/>
                    </IconButton>
                </IconWrapper>
            </CardActions>
        </CardContent>
     );
}
 
export default CommentBox;