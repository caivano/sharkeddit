import React from 'react';
import { render, fireEvent, wait, screen, getByPlaceholderText, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
import axios from 'axios'

axios.get = jest.fn().mockResolvedValue({
  posts:[]
})

axios.post = jest.fn().mockResolvedValue()

axios.put = jest.fn().mockResolvedValue()

describe('FeedPage tests', () => {
  test('initial render', async () => {
    axios.get = jest.fn().mockResolvedValue({
      posts: [{
        commentsCount: 3,
        createdAt: 1601646204595,
        id: "123",
        text: "Texto do post teste",
        title: "Comentário",
        userVoteDirection: 0,
        username: "Usuário",
        votesCount: 1
      }]
    })

    render(<App/>)

    const titleInput = await screen.getByPlaceholderText('Escreva aqui seu post')
    expect(titleInput).toBeInTheDocument()

    const textInput = screen.getByPlaceholderText('Título do post')
    expect(textInput).toBeInTheDocument()
    
    const button = screen.getByText('postar')
    expect(button).toBeInTheDocument()
    
    const testPost = screen.findByText('Texto do post teste')
    expect(testPost).toBeInTheDocument()

    expect(axios.get).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts')

  })

  test('post creation', async () => {
    axios.post = jest.fn().mockResolvedValue()
    axios.get = jest.fn().mockResolvedValue({
      posts: []
    })

    render(<App/>)

    const titleInput = screen.getByPlaceholderText('Escreva aqui seu post')
    expect(titleInput).toBeInTheDocument()

    const textInput = screen.getByPlaceholderText('Título do post')
    expect(textInput).toBeInTheDocument()
    
    const button = screen.getByText('postar')
    expect(button).toBeInTheDocument() 

    await userEvent.type(titleInput, 'Title 123')
    userEvent.type(textInput, 'Post 123')
    userEvent.click(button)

    expect(axios.post).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', {
      title: 'Title 123',
      text: 'Post 123'
    })

    await wait(() => {
      expect(axios.get).toHaveBeenCalledTimes(2)
    })
  })
})


