import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container, makeStyles, Typography, Button, CircularProgress, TextField } from '@material-ui/core';
import useProtectedPage from '../../hooks/useProtectedPage';
import useForm from '../../hooks/useForm'
import PostCard from '../../components/PostCard/PostCard';
import Loading from '../../components/Loading/Loading';
import { timePassed } from '../../helpers/timePassed'
import { baseURL } from '../../constants/urls';
import { createPost } from '../../services/posts'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
    },
    subcontainer: {
        marginBottom: theme.spacing(3)
    }
}))

const FeedPage = () => {
    const classes = useStyles();
    const [postArray, setPostArray] = useState([])
    const [buttonLoading, setButtonLoading] = useState(false)
    const [form, handleInputChange, resetState] = useForm({ title: '', text: ''})
    
    useProtectedPage();
    useEffect(() => {
        getAllPosts()
    }, [])

    const getAllPosts = () => {
        axios.get(`${baseURL}/posts`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then((response) => {
            setPostArray(response.data.posts)
        })
        .catch((error) => {
            console.log(error.response)
        })
    }
        
    const renderPosts = () => {
        return (
            postArray.filter(post => {return typeof post.title === 'string'} )
            .sort((a, b) => {return b.createdAt - a.createdAt})
            .map(post => {
                return (
                    <PostCard 
                        key={post.id} 
                        username={post.username} 
                        postTitle={post.title} 
                        postText={post.text} 
                        votesCount={post.votesCount} 
                        commentsCount={post.commentsCount} 
                        postId={post.id}
                        createdAt={timePassed(post.createdAt)}
                    />
                )
            })
        )
    }

    const onClickCreate = (event) => {
        event.preventDefault()
        const element = document.getElementById('feed-form')
        const isValid = element.checkValidity()
        element.reportValidity()
        if(isValid){
            createPost(form, setButtonLoading, getAllPosts)
            resetState()
        }
    }

    return ( 
        <Container className={classes.root} maxWidth="md">
            <Typography variant={'h5'} align={"center"}>Crie seu post</Typography>
            <Container className={classes.subcontainer}>
                <form id='feed-form'>
                    <TextField
                        value={form.title}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Título do post"
                        name="title"
                    />
                    <TextField
                        value={form.text}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        label="Escreva aqui seu post"
                        name="text"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onClickCreate}
                    >
                        {buttonLoading ? <CircularProgress color={'inherit'} size={24}/> : <>postar</>}
                    </Button>
                </form>
            </Container>
            {postArray && postArray.length > 0 ? renderPosts() : <Loading/>}
        </Container>
     );
}
 
export default FeedPage;
