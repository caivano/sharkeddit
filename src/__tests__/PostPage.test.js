import React from 'react';
import axios from 'axios';
import 'jest-canvas-mock';
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostPage from '../screens/PostPage'

const mockPostDetail = () => {
axios.get = jest.fn().mockResolvedValue({
    post: {
        comments: [
            {
            userVoteDirection: 0,
            id: "PvA5iyq6xnHKT7LFyg73",
            username: "darvas",
            text: "Texto do comentario aqui!",
            createdAt: 1591622964376,
            votesCount: 0
            }
        ],
        userVoteDirection: -1,
        id: "WCmBIGyynC5ihJFUmHFf",
        text: "Texto do post aqui!",
        commentsCount: 1,
        title: "Titulo aqui!",
        username: "darvas",
        votesCount: -1,
        createdAt: 1591622901616
        }
    })
}

afterEach(cleanup)

test.skip('render post detail', () => {
    mockPostDetail()
    render(<PostPage/>)

    const testPostText = screen.findByText('Titulo aqui!')
    expect(testPostText).toBeInTheDocument()
    
    const testPostComment = screen.findByText('Texto do comentario aqui!')
    expect(testPostComment).toBeInTheDocument()

    expect(axios.get).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/WCmBIGyynC5ihJFUmHFf')

})

test.skip('vote', () => {
    mockPostDetail()
    render(<PostPage/>)

    const positiveVoteButton = screen.getByTestId('positive-vote')
    userEvent.click(positiveVoteButton)

    expect(axios.put).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/WCmBIGyynC5ihJFUmHFf/vote',
    {
        direction: 1
    })
})
