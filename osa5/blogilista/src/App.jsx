import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  /*const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')*/

  
  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with ', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (ex) {
      /*setErrorMessage('')
      setTimeout.....
      */
    }
  }

  /*const handleNewBlog = (e) => {
    e.preventDefault()
  }*/

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
      <p><b>{user.name} logged in</b></p>
      {blogs.map(b => <Blog key={b.id} blog={b} />)}
    </>
  )
  
   /* 
   <form onSubmit={handleNewBlog}>
      <div>
        Title <input type="text" value={newTitle} name="Title"
        onChange={({ target }) => setNewTitle(target.value)} />
      </div>
      <div>
        Author <input type="text" value={newAuthor} name="Author"
        onChange={({ target }) => setNewAuthor(target.value)} />
      </div>
      <div>
        URL <input type="text" value={newUrl} name="url"
        onChange={({ target }) => setNewUrl(target.value)} />
      </div>
      <button type="submit">Add blog</button>
    </form>
    */
  

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App
