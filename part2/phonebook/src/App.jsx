import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
    },
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {

    event.preventDefault();
    
    const personObject = {

      name: newName,

    }

    for(var i = 0; i < persons.length; i++){

      if(persons[i].name === personObject.name){
        //issue alert
        alert(`${newName} is already added to phonebook`)        
        setNewName('')
        return
      }

    }

    setPersons(persons.concat(personObject))
    setNewName('')
    
  }

  const handleNewPerson = (event) => {

    setNewName(event.target.value);

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((persons) => <li key = {persons.name}> {persons.name} </li>)}
        </ul>
      </div>
    </div>
  )
}

export default App