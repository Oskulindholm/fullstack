import personService from './services/Persons'


import React, { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const name = newName.trim()
    const number = newNumber.trim()

    const personDouble = findName()
    
    if (personDouble !== undefined) {
      if (window.confirm(`${name} is already added to the phonebook.\nWould you like to replace the old number ?`)) {
        personDouble.number = newNumber

        personService
          .update(personDouble)
          .then(() => {
            personService
            .getAll()
            .then(updatedPersons => {
              setPersons(updatedPersons)
            })
            setNotification([`${personDouble.name}'s number updated successfully`, "success"])
              setTimeout(() => {
            setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setNotification([`Information on ${personDouble.name} has already been removed from server`, "error"])
              setTimeout(() => {
            setNotification(null)
            }, 3000)
            setPersons(persons.filter(p => p.id !== personDouble.id))
          })
          setNewName('')
          setNewNumber('')
      }
      return
    }

    const newPerson = {
      name: name,
      number: number
    }

    personService
    .create(newPerson)
    .then(res => {
      setPersons(persons.concat(res))
      setNotification([`Added ${newPerson.name}`, "success"])
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      setNewName('')
      setNewNumber('')
    })
  }

  const findName = () => {
    return (persons.find(p => p.name.toLowerCase().trim() === newName.toLowerCase().trim()))
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

  const handleErase = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .erase(person)
        .then(() => {
          personService
          .getAll()
          .then(updatedPhonebook => {setPersons(updatedPhonebook)})
        setNotification([`${person.name} deleted successfully`, "success"])
        setTimeout(() => {
          setNotification(null)
        }, 3000)
        })
    }
  }

  return (
    <div>
      <Notification msg={notification} />

      <h2>Phonebook</h2>
      <Filter handler={handleFilter} />

      <h3>Add new</h3>
      <PersonForm submitHandler={addPerson} nameHandler={handleNameChange} numberHandler={handleNumberChange}
      nameValue={newName} numberValue={newNumber} />

      <h3>Numbers</h3>
      <PersonList persons={persons} filter={filter} handler={handleErase} />
    </div>
  )

}

/// NOTIFICATION component renders a notification on screen.
const Notification = ({msg}) => {
  if (msg === null) {
    return null
  }

  const msgContent = msg[0]
  const msgClass = msg[1]

  
  return (
    <div className={msgClass} >
      {msgContent}
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
const PersonList = ({persons, filter, handler}) => {

  return (
    <>
    {persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      .map(p => <p key={p.name}> {p.name} {p.number} <button onClick={() => handler(p)} >Delete</button> </p>)}
    </>
  )
}
export default App;