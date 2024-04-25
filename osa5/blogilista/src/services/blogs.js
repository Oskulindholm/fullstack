import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async() => {
    const res = await axios.get(baseUrl)
    return res.data
}

const postBlog = async newBlog => {
    const config = {
        headers: { Authorization: token}
    }
    const res = await axios.post(baseUrl, newBlog, config)
    return res.data
}

const deleteBlog = async blog => {
    const res = await axios.delete(`${baseUrl}/${blog.id}`, blog.id)
    return res.data
}

export default {
    setToken,
    getAll,
    postBlog,
    deleteBlog
}