import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { goToPost } from '../../routes/Coordinator';
import useForm from '../../hooks/useForm';
import { createComment } from '../../services/posts';
import { CommentFormBox } from './styled'

const CommentForm = (props) => {
    const {postId} = props
    

    

    return ( 
        
     );
}
 
export default CommentForm;
