import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handlePerson = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearchName(event.target.value)

  useEffect(() => {
    
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.lenght + 1
    }

    const checkPerson = persons.find(person => person.name === newName)

    if(checkPerson) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(personObject)
      .then (response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
        search={searchName} 
        handle={handleSearch} />
      <h3>add a new</h3>
        <PersonForm 
        aP={addPerson} 
        name={newName} 
        number={newNumber} 
        hP={handlePerson} 
        hN={handleNumber} />
      <h2>Numbers</h2>
        <Person  
        persons={persons} 
        search={searchName} />
    </div>
  )

}

export default App