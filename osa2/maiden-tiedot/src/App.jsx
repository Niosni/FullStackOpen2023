import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [country, setCountry] = useState(null)
  const [countryData, setCountryData] = useState([])
  const [countryNamesToShow, setCountryNamesToShow] = useState([])
  const [filterValue, setFilterValue] = useState('')

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
    console.log(filteredCountries);
    if (filteredCountries.length === 1) {
      setCountry(getCountryWithName(filteredCountries[0]))
    }
    
  }

  let showSearch = false
  if (countryNamesToShow.length<10) {
    showSearch = true
  }

  const getCountryWithName = (name) => {
    return countryData.filter(n => n.name.common === name)[0]
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
        {countryNamesToShow.length===1 
        ? <CountryInfo country={country}/>
        : <CountryList
            countryNamesToShow={countryNamesToShow}
            showSearch={showSearch}
          />}
      </div>

    </>
  )
}

export default App
