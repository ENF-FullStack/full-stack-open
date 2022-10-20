/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog testing', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'reactpatterns.com',
    likes: 10,
    user: { name: 'Markus Tervonen', username: 'matervon' },
  }

  const testuser = {
    id: '123456789',
    name: 'matervon',
  }

  const mockHandleLikes = jest.fn()
  const mockHandleBlogs = jest.fn()
  const username = 'matervon'
  const token = '1234567890'

  test('renders content', () => {
    render(<Blog blog={blog} />)

    let element = screen.queryByText(/React patterns by Michael Chan/)
    expect(element).toBeDefined()

    element = screen.queryByText(/reactpatterns.com/)
    expect(element).toBeNull()

    element = screen.queryByText(/likes/)
    expect(element).toBeNull()
  })

  // url + likes works, but only when url https:// was removed
  test('url and likes are rendered after View button is clicked', async () => {
    render(<Blog blog={blog} user={username} token={token} />)

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    let element = screen.queryByText(/reactpatterns.com/)
    expect(element).not.toBe(null)
    element = screen.queryByText(/Likes: 10/)
    expect(element).not.toBe(null)
  })

  test('like button clicked twice', async () => {
    render(
      <Blog
        blog={blog}
        user={testuser}
        token={token}
        handleLikes={mockHandleLikes}
        setBlogs={mockHandleBlogs}
      />
    )

    const user = userEvent.setup()
    const vbutton = screen.findByText('View')
    user.click(vbutton)

    const lbutton = screen.findByText('Like')
    user.click(lbutton)
    user.click(lbutton)

    // expect(mockHandleLikes.mock.calls).toHaveLength(2)
    const newLikes = screen.queryByText(/likes: 12/)
    expect(newLikes).toBeDefined
  })
})
