/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={addBlog} />)
  const inputTitle = screen.getByPlaceholderText('title here 123')
  const inputAuthor = screen.getByPlaceholderText('author here 456')
  const inputUrl = screen.getByPlaceholderText('url here 789')
  const sendButton = screen.getByText('Add blog')

  await user.type(inputTitle, 'Testtitle')
  await user.type(inputAuthor, 'Testauthor')
  await user.type(inputUrl, 'Testurl')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'Testtitle',
    author: 'Testauthor',
    url: 'Testurl',
  })
})
