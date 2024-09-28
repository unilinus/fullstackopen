import { useState, useEffect } from 'react'
import Country from './components/Country'
import Notification from './components/Notification'
import noteService from './services/countries'

const Filter = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      find countries <input onChange={props.handleFilterChange} />
    </div>
  </form>
)

const Countries = (props) => {
  if (props.countriesShow.length > 10) {
    return <Notification message={'Too many matches, specify another filter'} />
  } else if (props.countriesShow.length > 1) {
    return props.countriesShow.map((country) => (<p key={country.name.common}>{country.name.common}</p>))
  } else if (props.countriesShow.length === 1) { return <Country country={props.countriesShow[0]}></Country> }
  else {
    return <p>No country found</p>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = newFilter === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase().trim()))

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries countriesShow={countriesToShow}></Countries>
    </div>
  )
}

export default App