const WeatherInfo = ({weatherInfo, weatherIcon}) => {
    const iconValue = weatherInfo.weather[0].icon

    if (!weatherInfo) {
        return <></>
    }
    const temperatureValue = weatherInfo.main.temp-272.15
    const temperature = temperatureValue.toString().slice(0,4)
    return (
      <div>
      <h3>Weather in {weatherInfo.name}</h3>
        <p>Temperature: {temperature} Celcius</p>
        <img className="weatherIcon"src={`https://openweathermap.org/img/wn/${iconValue}@2x.png`} alt="pic"/>
        <p>Wind: {weatherInfo.wind.speed} m/s</p>
      </div>
    )
  }

  export default WeatherInfo