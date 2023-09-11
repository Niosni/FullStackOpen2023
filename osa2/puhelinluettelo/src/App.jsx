import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons');

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
      <Filter 
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new entry</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addDetails={addDetails}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        listToShow={listToShow}
      />
    </div>
  )

}

export default App