import { useEffect, useState, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState([])
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  
  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('currentUser')
    if (loggedUser) {
      const currentUser = JSON.parse(loggedUser)
      setUser(currentUser)
      blogService.setToken(currentUser.token)
    }
  }, [])

  const notify = msg => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(username, 'logging in')
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (ex) {
      notify([`${ex.response.data.error}`, 'error'])
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    console.log(user.username, 'logged out')
    window.localStorage.removeItem('currentUser')
    setUser(null)
  }

  const handleNewBlog = async (newBlog) => {
    newBlog.title = newBlog.title.trim()
    newBlog.author = newBlog.author.trim()
    newBlog.url = newBlog.url.trim()

    try {
      const addedBlog = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(addedBlog))
      notify([`A new blog "${addedBlog.title}" added to bloglist.`, 'success'])
      blogFormRef.current.toggleVisibility()
    } catch(ex) {
      notify([`Blog could not be added to bloglist. Required information missing.`, 'error'])
    }
  }

  const handleLike = async (likedBlog) => {
    const updatedBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1,
      user: likedBlog.user.id
    }
    const u = likedBlog.user
    await blogService.updateBlog(updatedBlog)
    updatedBlog.user = u
    setBlogs(blogs.map(b => b.id === likedBlog.id ? updatedBlog : b))
  }


  const loginForm = () => (
    <>
      <h1> Login to application </h1>
      
      <Notification msg={notification} />

      <form onSubmit={handleLogin}>
      <div>
        Username: <input type="text" value={username} name="Username"
        onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        Password: <input type="password" value={password} name="Password"
        onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
      </form>
    </>
  )

  const blogForm = () => (
    <>
      <h1> Bloglist </h1>

      <Notification msg={notification} />

      <p>
        <b>{user.name} logged in </b>
        <button type="submit" onClick={handleLogout}>Logout</button>
      </p>

      <Togglable buttonLabelShow={'Add blog'} buttonLabelHide={'Cancel'} ref={blogFormRef}>
        <BlogForm createBlog={handleNewBlog} />
      </Togglable> <br/>

      {blogs.map(b => 
        <div key={b.id}>
          <Blog key={b.title} blog={b} handleLike={handleLike}/> <br/>
        </div>
      )}
    </>
  )
  


  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App
