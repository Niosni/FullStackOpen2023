const CountryName = ({countryName, showButton}) => {
    return (
        <div>
            {countryName}
            <button onClick={showButton}>
                show
            </button>
        </div>
    )
}

export default CountryName