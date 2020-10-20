import axios from 'axios'
const token = localStorage.getItem('token')

export const sendVote = (id, direction) => {
    const body = {
        direction: direction
    }
    axios.put(`${process.env.REACT_APP_BASE_URL}/posts/${id}/vote`, body, {
        headers: {
            Authorization: token
        }
    })
    .then()
    .catch((error) => {
        console.log(error.response)
    })
}
    
export const sendCommentVote = (postId, commentId, direction) => {
    const body = {
        direction: direction
    }
    axios.put(`${process.env.REACT_APP_BASE_URL}/posts/${postId}/comment/${commentId}/vote`, body, {
        headers: {
            Authorization: token
        }
    })
    .then()
    .catch((error) => {
        console.log(error.response)
    })
}
