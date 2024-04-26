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
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
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

  const handleNewBlog = async (e) => {
    e.preventDefault()
    const title = newTitle.trim()
    const author = newAuthor.trim()
    const url = newUrl.trim()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const addedBlog = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(addedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      notify([`A new blog "${addedBlog.title}" added to bloglist.`, 'success'])
      blogFormRef.current.toggleVisibility()
    } catch(ex) {
      notify([`Blog could not be added to bloglist. Required information missing.`, 'error'])
    }
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

      <Togglable buttonLabel={'Add blog'} ref={blogFormRef}>
        <BlogForm handleSubmit={handleNewBlog} title={newTitle} author={newAuthor}
          url={newUrl}handleTitle={({ target }) => setNewTitle(target.value)}
          handleAuthor={({ target }) => setNewAuthor(target.value)}
          handleUrl={({ target }) => setNewUrl(target.value)} />
      </Togglable>

      {blogs.map(b => <Blog key={b.id} blog={b} />)}
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
