import { useState } from 'react'

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
  <li key={props.id}>{props.name} {props.number}</li>
)

const Persons = (props) => (
  <div>
    <ul>{props.personsToShow.map(person => <Person name={person.name} id={person.id} number={person.number}/>)}</ul>
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App