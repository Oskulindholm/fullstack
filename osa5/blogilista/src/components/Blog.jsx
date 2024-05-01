import { useState } from "react"
import { useEffect } from "react"

const Blog = ( {blog, user, handleLike, handleRemove} ) => {
  const [visible, setVisible] = useState(false)
  const [showRemove, setShowRemove] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    if (user.username === blog.user.username) {
      setShowRemove(true)
    } else {
      setShowRemove(false)
    }
  }, [user, blog.user.username])
  
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
      Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button> <br/>
      {blog.user.username} <br/>
      {showRemove && <button onClick={() => handleRemove(blog)}>Remove</button>}
    </div>
    </>
  )
}

export default Blog