import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async() => {
    const res = await axios.get(baseUrl)
    return res.data
}

const postBlog = async newBlog => {
    const res = await axios.post(baseUrl, newBlog)
    return res.data
}

const deleteBlog = async blog => {
    const res = await axios.delete(`${baseUrl}/${blog.id}`, blog.id)
    return res.data
}

export default {
    getAll,
    postBlog,
    deleteBlog
}