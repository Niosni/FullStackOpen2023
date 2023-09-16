import { useState, useEffect } from 'react'
import countryService from './services/countries'

const App = () => {
  const [country, setCountry] = useState('')

  useEffect(() => {
    countryService
    .getCountry('sweden')
    .then(response  =>
      setCountry(response.capital)
    )
  }, [])

  const handleClick = () => {
    countryService
    .getCountry('finland')
    .then(response  =>
      setCountry(response.capital)
    )
  }

  return (
    <>
      <button onClick={handleClick}>
        suomi
      </button>
      {country}
    </>
  )
}

export default App
