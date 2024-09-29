import { useState, useEffect } from 'react'
import Country from './components/Country'
import Weather from './components/Weather'
import countryService from './services/countries'
import weatherService from './services/weathers'

const api_key = import.meta.env.VITE_SOME_KEY

const Filter = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      find countries <input onChange={props.handleFilterChange} />
    </div>
  </form>
)

const Weathers = ({ country, cityName }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1], api_key)
    .then(initialWeather => {
      setWeather(initialWeather)
    })
  }, [])

  if (weather !== null) {
    return <Weather weather={weather} cityName={cityName}></Weather>
  }

}

const Countries = (props) => {

  if (props.countriesShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (props.countriesShow.length > 1) {
    return props.countriesShow.map((country) => (<p key={country.name.common}>{country.name.common}<button onClick={() => props.setCountriesToShow(props.countriesShow.filter(c => country.name.common === c.name.common))} key={country.name.common}>show</button></p>))
  } else if (props.countriesShow.length === 1) {
    return <div>
      <Country country={props.countriesShow[0]}></Country>
      <Weathers country={props.countriesShow[0]} cityName={props.countriesShow[0].capital}></Weathers>
    </div>
  } else {
    return <p>No country found</p>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [countriesToShow, setCountriesToShow] = useState(countries)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        setCountriesToShow(newFilter === '' ? initialCountries : initialCountries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase().trim())))
      })
  }, [])

  const handleFilterChange = (event) => {
    event.preventDefault()
    const filterValue = event.target.value;
    setNewFilter(filterValue);
    setCountriesToShow(filterValue === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase().trim())))
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries countriesShow={countriesToShow} setCountriesToShow={setCountriesToShow}></Countries>
    </div>
  )
}

export default App