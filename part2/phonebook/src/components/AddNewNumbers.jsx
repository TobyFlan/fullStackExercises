import { useState } from 'react'

const AddNewNumbers = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const handleNewPerson = (event) => {
  
      setNewName(event.target.value);
  
    }
  
    const handleNewNumber = (event) => {
  
      setNewNumber(event.target.value);
  
    }
  
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
  
    return(
      <>
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
      </>
    )
  
}

export default AddNewNumbers

  