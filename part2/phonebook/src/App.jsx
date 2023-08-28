import { useState, useEffect } from 'react'

import personService from './services/people'
import EditFilter from './components/EditFilter'
import AddNewNumbers from './components/AddNewNumbers'
import ListFilter from './components/ListFilter'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {

    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      
  }, [])

  const deletePerson = (id) => {

    const person = persons.filter(p => p.id === id)
    const name = person.map(p => p.name)

    if(window.confirm(`delete ${name}?`)){

      personService.deletePerson(id)
 
      setPersons(persons.filter(p => p.id !== id))

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <EditFilter newFilter={newFilter} handleFilter={setNewFilter}/>
      <AddNewNumbers persons={persons} setPersons={setPersons}/>
      <ListFilter persons = {persons} filter = {newFilter} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App