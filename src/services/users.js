import axios from 'axios'
import {baseURL} from '../constants/urls'
import { goToFeed } from '../routes/Coordinator'

export const login = (body, history, setButtonName) => {
    axios.post(`${baseURL}/login`, body)
    .then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.user.username)
        goToFeed(history)
        setButtonName('logout')
    })
    .catch((error) => {
        console.log(error.response)
        alert('Falha no login, tente novamente!')
    })
}

export const signup = (body, history, setButtonName) => {
    axios.post(`${baseURL}/signup`, body)
    .then((response) => { 
        localStorage.setItem('token', response.data.token)
        goToFeed(history)
        setButtonName('logout')
    })
    .catch((error) => {
        console.log(error.response)
    })
}