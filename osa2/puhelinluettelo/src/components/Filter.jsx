const Filter = ({filterValue, handleFilterChange}) => {
  return (
    <div className='filter'>
            filter shown with <input 
        value={filterValue}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter