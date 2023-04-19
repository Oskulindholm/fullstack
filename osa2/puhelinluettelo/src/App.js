import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }, 
    { name: 'Grace Hopper'}
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const name = newName.trim()

    if (persons.find(p => p.name.trim().toLowerCase() === newName.trim().toLowerCase())) {
      window.alert(`${name} is already added to the phonebook.`)
      return
    }

    const newPerson = {
      name: name
    }
  
    setPersons(persons.concat(newPerson))
    setNewName('')

    console.log(newPerson.name + ' added')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
        {persons.map(p => <p key={p.name}> {p.name} </p>)}
    </div>
  )

}

export default App