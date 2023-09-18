import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weathers'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'
import WeatherInfo from './components/WeatherInfo'

const App = () => {
  const [country, setCountry] = useState(null)
  const [countryData, setCountryData] = useState([])
  const [countryNamesToShow, setCountryNamesToShow] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [showCountryInfo, setShowCountryInfo] = useState(false)
  const [weatherInfo, setWeatherInfo] = useState(null)
  const api_key = import.meta.env.VITE_API_KEY

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountryData(response)
        setCountryNamesToShow(response.map( country =>
          country.name.common
        ))
        setCountry(response[0])
      })
  }, [])

  const handleFiltering = (event) => {
    const newFilterValue = event.target.value
    setFilterValue(newFilterValue)
    const allNames = countryData.map( country =>
      country.name.common
    )

    let filteredCountries = allNames.filter(c=>
      c.toLowerCase().includes(newFilterValue.toLowerCase())
    )
    setCountryNamesToShow(filteredCountries)
    //console.log(filteredCountries);
    if (filteredCountries.length === 1) {
      setShowCountryInfo(true)
      let newCountry = getCountryWithName(filteredCountries[0])
      setCountry(newCountry)
      getWeatherInfo(newCountry)
      setCountryNamesToShow('')
    } else {
      setShowCountryInfo(false)
    }
    
  }

  let showSearch = false
  if (countryNamesToShow.length<10) {
    showSearch = true
  }

  const getWeatherInfo = (newCountry) => {
    weatherService
    .getWeather(api_key, newCountry.capitalInfo.latlng[0], newCountry.capitalInfo.latlng[1])
    .then(response => {
      setWeatherInfo(response)
    })
  }

  const getCountryWithName = (name) => {
    return countryData.filter(n => n.name.common === name)[0]
  }

  const showButton = (name) => {
    setCountry(getCountryWithName(name))
    setShowCountryInfo(true)
  }
  return (
    <>
      <div className='findCountry'>
        Find countries:
        <input 
          type='text'
          onChange={handleFiltering}
          value={filterValue}
        />
      </div>

      <div className='countryList'>
        {showCountryInfo 
        ? <CountryInfo country={country}/>
        : <CountryList
            countryNamesToShow={countryNamesToShow}
            showSearch={showSearch}
            showButton={showButton}
          />}
      </div>
        {weatherInfo 
        ? <WeatherInfo 
            weatherInfo={weatherInfo}
          />
        : <></>
        }

    </>
  )
}

export default App
