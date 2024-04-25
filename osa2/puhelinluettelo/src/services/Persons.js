import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
  }
  
  const create = newPerson => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(res => res.data)
  }

  const update = p => {
    const req = axios.put(`${baseUrl}/${p.id}`, p)
    return req.then(res => res.data)
  }

  const erase = person => {
    const req = axios.delete(`${baseUrl}/${person.id}`, person.id)
    return req.then(res => res.data)
  }

export default {
  getAll: getAll,
  create: create,
  update: update,
  erase:  erase
}