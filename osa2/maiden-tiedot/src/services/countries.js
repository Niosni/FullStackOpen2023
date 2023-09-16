import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountry = (countryName) => {
    const request = axios.get(`${baseUrl}/name/${countryName}`)
    const response = request.then(response => response.data)
    return response
}


export default { getCountry }