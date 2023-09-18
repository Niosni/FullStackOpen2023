const CountryName = ({country}) => {
    console.log(country);
    const languages = Object.values(country.languages)
    const flag = country.flags
    console.log(country.flags)

    return (
        <div>
        <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <div>
                Languages:
                <ul>
                    {languages.map(language=>
                        <li>{language}</li>
                    )}
                </ul>
            </div>
            <img src={flag.png} alt={flag.alt} />
        </div>
    )
}

export default CountryName