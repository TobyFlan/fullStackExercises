import personService from '../services/people'
import { useState } from 'react'


const AddNewNumbers = ({ persons, setPersons, setNewMessage, setErrorMessage}) => {
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
          //want to ask them if they want to change the number
          if(window.confirm(`${personObject.name} is already added to phonebook, reaplce the old number with a new one?`)){

            personService
              .update(persons[i].id, personObject)
              .then(response => {
                setPersons(persons.map(p => 
                  p.id !== persons[i].id ?
                  p : response.data))
                  setNewMessage(`Changed the number of ${persons[i].name}`)
                  setTimeout(() => {
                    setNewMessage(null)
                  }, 3000)
                
              })
              //if entry is no longer in database
              .catch(() => {
                setErrorMessage(`Information of ${personObject.name} has already been removed from server`)
                setTimeout(() => {
                  setErrorMessage(null)
                }, 3000)
              })

            setNewName('')
            setNewNumber('')

          } else {
            setNewName('')
            setNewNumber('')
          }
          return
        }
  
      }
      

      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNewMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setNewMessage(null)
          }, 3000)
        })

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

  