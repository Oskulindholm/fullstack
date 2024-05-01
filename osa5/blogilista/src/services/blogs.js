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

const addBlog = async newBlog => {
    const config = {
        headers: { Authorization: token}
    }
    const res = await axios.post(baseUrl, newBlog, config)
    return res.data
}

const updateBlog = async blog => {
    const res = await axios.put(`${baseUrl}/${blog.id}`, blog)
    return res.data
}

const deleteBlog = async blog => {
    const req = await axios.delete(`${baseUrl}/${blog.id}`, blog.id)
    return req.then(res => res.data)
}

export default {
    setToken,
    getAll,
    addBlog,
    updateBlog,
    deleteBlog
}