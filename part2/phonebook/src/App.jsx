import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '0800-111-111'
    },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
          {persons.map((persons) => <li key = {persons.name}> <span>{persons.name} {persons.number}</span> </li>)}
        </ul>
      </div>
    </div>
  )
}

export default App