import { useState } from 'react'

import EditFilter from './components/EditFilter'
import AddNewNumbers from './components/AddNewNumbers'
import ListFilter from './components/ListFilter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newFilter, setNewFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <EditFilter newFilter={newFilter} handleFilter={setNewFilter}/>
      <AddNewNumbers persons={persons} setPersons={setPersons}/>
      <ListFilter persons = {persons} filter = {newFilter}/>
    </div>
  )
}

export default App