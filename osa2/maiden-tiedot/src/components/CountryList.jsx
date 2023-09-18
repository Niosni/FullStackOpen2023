import CountryName from "./CountryName"

const CountryList = ({countryNamesToShow, showSearch, showButton}) => {
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
                    showButton={() => showButton(countryName)}
                />
            )}
        </div>
    )
}

export default CountryList