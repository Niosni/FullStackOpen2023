import CountryName from "./CountryName"

const CountryList = ({countryNamesToShow, showSearch}) => {
    if (!showSearch) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (countryNamesToShow.length < 1) {
        return(
            <div>No matches, please change the search value</div>
        )
    }
    return (
        <div>
            {countryNamesToShow.sort().map((countryName)=> 
                <CountryName 
                    key={countryName}
                    countryName={countryName}
                />
            )}
        </div>
    )
}

export default CountryList