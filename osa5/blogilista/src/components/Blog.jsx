import { useState } from "react"

const Blog = ( {blog} ) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
      setVisible(!visible)
  }

  return (
    <>
    <div style={hideWhenVisible}>
      {blog.title} - {blog.author} <button onClick={toggleVisibility}>View</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title} - {blog.author} <button onClick={toggleVisibility}>Hide</button> <br/>
      {blog.url} <br/>
      Likes: {blog.likes} <button>Like</button> <br/>
      {blog.user.username}
    </div>
    </>
  )
}

export default Blog