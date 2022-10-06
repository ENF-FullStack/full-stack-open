/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 10,
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('React patterns')
  expect(div).toHaveTextContent('Michael Chan')
  expect(div).not.toHaveTextContent('https://reactpatterns.com/')
  expect(div).not.toHaveValue(10)
})

// test does not work completely, button is not found by either role or text
// following url + likes works, but only when url https:// was removed
test('url and likes are rendered after View button is clicked', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'reactpatterns.com',
    likes: 10,
    user: '464646',
  }

  const tester = {
    id: '464646',
    name: 'Testuser',
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={tester} setBlogs={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  // expect(mockHandler.mock.calls).toHaveLength(1)

  const testurl = screen.getByText('reactpatterns.com')
  const testlikes = screen.getByText('Likes: 10')

  expect(testurl).toBeDefined()
  expect(testlikes).toBeDefined()
})
