import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('BLOG element renders title and author correctly', () => {
  const blog = {
    title: 'BLOG',
    author: 'Test author',
    url: 'http://test.url',
    likes: 3,
    user: { name: 'Test user', username: 'Test username' },
  }

  const u = {
    username: 'Test username'
  }

  render(<Blog blog={blog} user={u} />)

  const e = screen.getByText('BLOG', { exact: false })
  expect(e).toBeDefined
})