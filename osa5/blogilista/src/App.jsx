import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  
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
      /*setErrorMessage('')
      setTimeout.....
      */
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
    } catch(ex) {
      console.log(ex)
    }
  }

  const loginForm = () => (
    <>
      <h1> Login to application </h1>
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

      <p>
        <b>{user.name} logged in </b>
        <button type="submit" onClick={handleLogout}>Logout</button>
      </p>

      <h2> Add a new blog </h2>
      <form onSubmit={handleNewBlog}>
        <div>
          Title: <input type="text" value={newTitle} name="Title"
          onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
          Author: <input type="text" value={newAuthor} name="Author"
          onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
          URL: <input type="text" value={newUrl} name="url"
          onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <button type="submit" onClick={handleNewBlog}>Add</button>
      </form>

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
