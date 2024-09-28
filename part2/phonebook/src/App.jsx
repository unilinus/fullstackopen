import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'

const Filter = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      filter shown with: <input onChange={props.handleFilterChange} />
    </div>
  </form>
)

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = (props) => (
  <li key={props.person.id}>
        {props.person.name} {props.person.number}
        <button onClick={() => props.deletePerson(props.person)}>delete</button>
      </li>
)

const Persons = (props) => (
  <div>
    <ul>{props.personsToShow.map(person => <Person key={person.id} person={person} deletePerson={props.deletePerson}></Person>)}
    </ul>
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
}, [])

  const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase().trim()))
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).indexOf(personObject.name) === -1) {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
    } else {
      const person = persons.find(p => p.name === newName)
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      personsService
        .update(person.id, personObject)
        .then(returnedPerson => {
          const personsUpdated = persons.filter(p => p.id !== person.id)
          setPersons(personsUpdated.concat(returnedPerson))
          setErrorMessage(
            `${personObject.name}'s phonenumber changed`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    confirm(`Delete ${person.name} ?`)
    personsService.remove(person.id)
    .then(() => {
      const personsUpdated = persons.filter(p => p.id !== person.id)
      setPersons(personsUpdated)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter
        addPerson={addPerson} handleFilterChange={handleFilterChange}
      />
      <h2>add new contact</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App