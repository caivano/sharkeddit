import React from 'react';
import '@testing-library/jest-dom'
import 'jest-canvas-mock';
import { render, wait, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import FeedPage from '../screens/FeedPage';

axios.get = jest.fn().mockResolvedValue({
  posts:[]
})
axios.post = jest.fn().mockResolvedValue()
axios.put = jest.fn().mockResolvedValue()

const getPostCreationForm = () => {
    render(<FeedPage/>)

    const titleInput = screen.getByLabelText('Escreva aqui seu post')
    expect(titleInput).toBeInTheDocument()

    const textInput = screen.getByLabelText('Título do post')
    expect(textInput).toBeInTheDocument()
    
    const button = screen.getByText('postar')
    expect(button).toBeInTheDocument()
}

afterEach(cleanup)

test('initial render', () => {
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

  getPostCreationForm()
  
  const testPost = screen.findByText('Texto do post teste')
  expect(testPost).toBeInTheDocument()

  expect(axios.get).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts')

})

test.skip('post creation', async () => {
  axios.post = jest.fn().mockResolvedValue()
  axios.get = jest.fn().mockResolvedValue({
    posts: []
  })

  getPostCreationForm()

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

