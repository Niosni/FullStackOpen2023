const CountryName = ({countryName, showButton}) => {
    return (
        <div key={countryName}>
            {countryName}
            <button onClick={showButton}>
                show
            </button>
        </div>
    )
}

export default CountryName