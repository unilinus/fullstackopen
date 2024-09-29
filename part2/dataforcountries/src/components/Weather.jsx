const Weather = ({ weather, cityName}) => {
    return (
      <div>
        <h2>Weather in {cityName}</h2>
        <p>temperature {weather.main.temp} Celsius</p>
        <p>wind {weather.wind.speed} m/s</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`icon for ${weather.weather[0].description}`}></img>
      </div> 
    )
  }
  
  export default Weather