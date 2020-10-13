import axios from 'axios'
import {baseURL} from '../constants/urls'

const token = localStorage.getItem('token')

export const sendVote = (id, direction) => {
    const body = {
        direction: direction
    }
    axios.put(`${baseURL}/posts/${id}/vote`, body, {
        headers: {
            Authorization: token
        }
    })
    .then((response) => {
        console.log(direction)
    })
    .catch((error) => {
        console.log(error)
    })
}

    
export const sendCommentVote = (postId, commentId, direction) => {
    const body = {
        direction: direction
    }
    axios.put(`${baseURL}/posts/${postId}/comment/${commentId}/vote`, body, {
        headers: {
            Authorization: token
        }
    })
    .then((response) => {
    })
    .catch((error) => {
        console.log(error)
    })
}