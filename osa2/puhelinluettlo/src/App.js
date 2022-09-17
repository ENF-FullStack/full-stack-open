import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handlePerson = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearchName(event.target.value)

  useEffect(() => {
    //console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  //console.log('render', persons.length, ' persons')

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

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

    axios
      .post('http://localhost:3001/persons', personObject)
      .then (response => {
        console.log(response)
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