import { useState, useEffect } from 'react'

import './index.css'

import personService from './services/people'
import EditFilter from './components/EditFilter'
import AddNewNumbers from './components/AddNewNumbers'
import ListFilter from './components/ListFilter'

const Notification = ({ message, errType }) => {

  if(message === null){
    return null;
  }

  return (
    <div className={errType}>
      {message}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))

          setNewMessage(() => `Deleted ${name}`)
          setTimeout(() => {
            setNewMessage(() => (null))
          }, 3000)
        })
        .catch(() => {
          setErrorMessage(`${name} has already been deleted from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
 


    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errType={'error'} />
      <Notification message={newMessage} errType={'added'} />
      <EditFilter newFilter={newFilter} handleFilter={setNewFilter}/>
      <AddNewNumbers persons={persons} setPersons={setPersons} setNewMessage={setNewMessage} setErrorMessage={setErrorMessage} />
      <ListFilter persons = {persons} filter = {newFilter} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App