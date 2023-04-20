import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
  }
  
  const create = newPerson => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(res => res.data)
  }

  const erase = person => {
    return axios.delete(`${baseUrl}/${person.id}`, person.id)
  }

  export default {
    getAll: getAll,
    create: create,
    erase:  erase
  }