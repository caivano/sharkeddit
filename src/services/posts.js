import axios from 'axios'

const token = localStorage.getItem('token')

export const getAllPosts = (setPostArray) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, {
        headers: {
            Authorization: token
        }
    })
    .then((response) => {
        setPostArray(response.data.posts)
    })
    .catch((error) => {
        console.log(error)
    })
}

export const createPost = (body, setIsLoading) => {
    setIsLoading(true)
    axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, body, {
        headers: {
            Authorization: token
        }
    })
    .then(() => {
        setIsLoading(false)
        alert('Post criado com sucesso')
    })
    .catch(() => {
        setIsLoading(false)
        alert('Algo deu errado. Por favor, tente novamente.')
    })
}

export const createComment = (id, body, setIsLoading, getPostDetail, setPostDetail, setPostComments) => {
    setIsLoading(true)
    axios.post(`${process.env.REACT_APP_BASE_URL}/posts/${id}/comment`, body, {
        headers: {
            Authorization: token
        }
    })
    .then(() => {
        setIsLoading(false)
        alert('Comentário criado com sucesso')
        getPostDetail(id, setPostDetail, setPostComments)
    })
    .catch((error) => {
        console.log(error.response)
    })
}

 export const getPostDetail = (id, setPostDetail, setPostComments) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
        headers: {
            Authorization: token
        }
    })
    .then((response) => {
        setPostDetail(response.data.post)
        setPostComments(response.data.post.comments)
    })
    .catch((error) => {
        console.log(error.response)
    })
}
