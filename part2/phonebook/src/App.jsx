import { useState } from 'react'

const ListFilter = (props) => {

  const toDisplay = props.persons.filter((person) => 
    person.name.toLowerCase().includes(props.filter.toLowerCase()) 
  )

  return (
    <>
    {toDisplay.map((persons) => 
      <li key = {persons.name}> 
        <span>
          {persons.name} {persons.number}
        </span> 
      </li>
    )}
    </>
  )


}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {

    event.preventDefault();
    
    const personObject = {

      name: newName,
      number: newNumber

    }

    for(var i = 0; i < persons.length; i++){

      if(persons[i].name === personObject.name){
        //issue alert
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }

    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    
  }

  const handleNewPerson = (event) => {

    setNewName(event.target.value);

  }

  const handleNewNumber = (event) => {

    setNewNumber(event.target.value);

  }

  const handleNewFilter = (event) => {

    setNewFilter(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with 
        <input value={newFilter} onChange={handleNewFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          <ListFilter persons = {persons} filter = {newFilter}/>
        </ul>
      </div>
    </div>
  )
}

export default App