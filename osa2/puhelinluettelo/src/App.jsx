import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(personData => {
        setPersons(personData)
      })
  }, [])

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const updateNumber = () => {
    const oldPersonObject = persons.find(p => p.name == newName)
    const updatedPersonObject = {
      ...oldPersonObject,
      number: newNumber
    }
    personService
      .update(oldPersonObject.id, updatedPersonObject)
      .then(returnedPerson => 
        setPersons(persons.map(person =>
          person.id !== updatedPersonObject.id ? person : returnedPerson
        ))
      )
  }

  const askToUpdateNumber = () => {
    //handle duplicate names
    const allNames = persons.map(person => person.name)
    if (allNames.includes(newName)) {
      if (confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        updateNumber()
        return true
      } else {
        return false
      }
    }
  }

  const addDetails = (event) => {
    event.preventDefault()
    // Check if the name already exists
    const personWasUpdated = askToUpdateNumber()
    if (!personWasUpdated) {
      const newPersonObject = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter( person =>
            person.id !== id
          ))
        })
        .catch(error => {
          alert('The person you tried to remove is not on the database. Please refresh the page.')
        })
    }
    return
  }

  // Filter by name
  let personsToShow = filterValue 
    ? persons.filter((person) => 
        person.name.toLowerCase().includes(filterValue.toLowerCase()
      ))
    : persons


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
        personsToShow={personsToShow}
        removePerson={removePerson}
      />
    </div>
  )

}

export default App