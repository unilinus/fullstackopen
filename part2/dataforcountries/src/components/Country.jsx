const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p><b>languages:</b></p>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
        <li key={key}>
          {value}
        </li>))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`}></img>
    </div>
  )
}

export default Country