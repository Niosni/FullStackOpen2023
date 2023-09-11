import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const addDetails = (event) => {
    event.preventDefault()
    
    //handle duplicate names
    const allNames = persons.map(person => person.name)
    if (allNames.includes(newName)) {
      alert(`${newName} is already added to the phonebook!`)
      return;
    }

    let personObject = {
      name: newName,
    }
    //Add number if one given
    if (newNumber) {
      personObject = {
        ...personObject,
        number: newNumber,
      }
      setNewNumber('')
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }
  // Filter by name
  let personsToShow = filterValue 
    ? persons.filter((person) => 
        person.name.toLowerCase().includes(filterValue.toLowerCase()
      ))
    : persons

  // Create the list to show
  let listToShow = personsToShow.map(person =>
    <div key={person.name}>{person.name} {person.number}</div>
  )
  
  

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with
        <input 
          value={filterValue}
          onChange={handleFilterChange}
        />
      </div>
      <h2>Add a new entry</h2>
      <form onSubmit={addDetails}>
        <div>
          name: 
            <input 
              value={newName}
              onChange={handleNameChange}
            />
        </div>
        <div>
          number:
            <input 
              value={newNumber}
              onChange={handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {listToShow}
    </div>
  )

}

export default App