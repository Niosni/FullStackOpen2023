const Filter = ({filterValue, handleFilterChange}) => {
    return (
        <div>
            <input 
                value={filterValue}
                onChange={handleFilterChange}
            />
        </div>
    )
}

export default Filter