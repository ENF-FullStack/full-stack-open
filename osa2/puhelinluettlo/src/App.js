import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [taskMessage, setTaskMessage] = useState(null)

  const handlePerson = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearchName(event.target.value)

  useEffect(() => {
    
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    } 
  
    return (
      <div className="task">
        {message}
      </div>
    )
  
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.lenght + 1
    }

    const checkPerson = persons.find(person => person.name === newName)
    const checkNumber = persons.find(person => person.number === newNumber)

    if (checkPerson && checkNumber) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    
    if (checkPerson && !checkNumber) {
      const res = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if(res) {
          const updateId = persons.find(person => person.name === newName)
          Object.assign(personObject, {id: updateId.id})
          personService
            .update(updateId.id, personObject)
              .then(response => {
                setPersons(persons.map(p => p.id !== updateId.id ? p : response))
                setNewName('')
                setNewNumber('')

                setTaskMessage ( `Updated ${personObject.name} information` )
                setTimeout(() => {
                  setTaskMessage(null)
                }, 5000)
              })
              .catch(error => {
                console.log('fail', error)
              })
        } else return
    }

    if (!checkPerson && !checkNumber) {
      personService
      .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')

          setTaskMessage ( `Added ${personObject.name}` )
          setTimeout(() => {
            setTaskMessage(null)
          }, 5000)
      })
      .catch(error => {
        console.log('fail', error)
      })
    }
  }

  const deletePerson = (id) => {
    id.preventDefault()
    console.log('clicked delete' , id.target.value)

    const deletedName = persons.find(person => person.id == id.target.value)
    //console.log(deletedName.name)
    const newList = persons.filter((person) => person.id != id.target.value)
    //console.log(newList)

    const res = window.confirm(`Delete ${deletedName.name} ?`)
      if(res) {
        personService
          .deletePerson(id.target.value)
          .then(response => {
            setPersons(newList)

            setTaskMessage ( `Removed ${deletedName.name}` )
            setTimeout(() => {
            setTaskMessage(null)
          }, 5000)
          })
      }  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={taskMessage} />
      <Filter
        search={searchName}
        handle={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        aP={addPerson}
        name={newName}
        number={newNumber}
        hP={handlePerson}
        hN={handleNumber}
      />
      <h2>Numbers</h2>
      <Person
        persons={persons}
        search={searchName}
        dP={deletePerson} />
    </div>
  )

}

export default App