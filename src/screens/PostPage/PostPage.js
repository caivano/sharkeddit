import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, makeStyles, Button, CircularProgress, TextField } from '@material-ui/core';
import PostCard from '../../components/PostCard/PostCard';
import CommentBox from '../../components/CommentBox'
import Loading from '../../components/Loading/Loading';
import useProtectedPage from '../../hooks/useProtectedPage';
import { getPostDetail } from '../../services/posts'
import { timePassed } from '../../helpers/timePassed'
import useForm from '../../hooks/useForm';
import { CommentFormBox } from './styled';
import { createComment } from '../../services/posts';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
    },
    box: {
        marginBottom: '20px'
    }
}))

const PostPage = () => {
    const classes = useStyles();
    const {id} = useParams();
    const [postDetail, setPostDetail] = useState({})
    const [postComments, setPostComments] = useState([])
    const [form, handleInputChange, resetState] = useForm({ text: ''})
    const [isLoading, setIsLoading] = useState(false)

    useProtectedPage()
    
    useEffect(() => {
        getPostDetail(id, setPostDetail, setPostComments)
    }, [id])

    const onClickCreate = (event) => {
        event.preventDefault()
        const element = document.getElementById('comment-form')
        const isValid = element.checkValidity()
        element.reportValidity()
        if(isValid){
            createComment(id, form, setIsLoading, getPostDetail, setPostDetail, setPostComments)
            resetState()
        }
    }
    
    const renderPostDetail = () => {
        return (
            <Container className={classes.root}>
                <PostCard
                    key={postDetail.id} 
                    username={postDetail.username} 
                    postTitle={postDetail.title} 
                    postText={postDetail.text} 
                    votesCount={postDetail.votesCount} 
                    commentsCount={postDetail.commentsCount} 
                    postId={postDetail.id}
                    className={classes.box}
                />
                <CommentFormBox id='comment-form'>
                    <TextField
                        value={form.text}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        label="Escreva aqui seu comentário"
                        name="text"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onClickCreate}
                    >
                        {isLoading ? <CircularProgress color={'inherit'} size={24}/> : <>comentar</>}
                    </Button>
                </CommentFormBox>
                {postComments.sort((a, b) => {return b.createdAt - a.createdAt}).map((comment) => {
                    return (
                        <CommentBox
                            key={comment.id}
                            id={comment.id}
                            username={comment.username}
                            text={comment.text}
                            votesCount={comment.votesCount}
                            postId={id}
                            createdAt={timePassed(comment.createdAt)}
                        />
                    )})}
            </Container>
        )
    }
    
    return ( 
        <>
        { postDetail ? renderPostDetail() : <Loading/> }
        </>
     );
}
 
export default PostPage;
