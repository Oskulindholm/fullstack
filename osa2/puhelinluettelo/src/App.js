import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const name = newName.trim()
    const number = newNumber.trim()

    if (persons.find(p => p.name.trim().toLowerCase() === newName.trim().toLowerCase())) {
      window.alert(`${name} is already added to the phonebook.`)
      return
    }

    const newPerson = {
      name: name,
      number: number
    }
  
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')

    console.log(newPerson.name + ' added')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilter} />

      <h3>Add new</h3>
      <PersonForm submitHandler={addPerson} nameHandler={handleNameChange} numberHandler={handleNumberChange}
      nameValue={newName} numberValue={newNumber} />

      <h3>Numbers</h3>
      <PersonList persons={persons} filter={filter} />
    </div>
  )

}


/// FILTER component renders the filter input field for the phonebook.
const Filter = ({handler}) => {

  return (
    <>
    Filter shown with: <input onChange={handler} />
    </>
  )
}


/// PERSONFORM component renders the form with input fields to add new persons to the phonebook.
const PersonForm = ({submitHandler, nameHandler, numberHandler, nameValue, numberValue}) => {

  return (
    <>
    <form onSubmit={submitHandler}>
        <div>
          Name: <input value={nameValue} onChange={nameHandler}/>
        </div>
        <div>
          Number: <input value={numberValue} onChange={numberHandler}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

/// PERSONLIST component renders the contents of the phonebook.
const PersonList = ({persons, filter}) => {

  return (
    <>
    {persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      .map(p => <p key={p.name}> {p.name} {p.number}</p>)}
    </>
  )
}
export default App