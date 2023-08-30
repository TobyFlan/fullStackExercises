import { useState, useEffect } from 'react'
import axios from 'axios'


//component used for changing/inputting new search queries
const SearchBar = ({setNewFilter}) => {

  const [value, setValue] = useState('')

  const handleInput = (event) => {
    console.log(`the box has become: ${event.target.value}`)
    setValue(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    console.log(`user has searched for ${value.toLowerCase()}`)
    setNewFilter(value.toLowerCase())
  }

  return(
    <>
      
      <form  onSubmit={handleSearch}>
        find new countries: 
        <input value={value} onChange={handleInput}></input>
        <button type={'submit'}>find</button>
      </form>
    </>
  )

}


//component to read the filter and gather results
const DisplayResults = (props) => {

  return null

}


function App() {

  const [newFilter, setNewFilter] = useState('')


  //test getting all api results
  const [allNames, setAllNames] = useState([])


  //useEffect to get all names from rest API only once 
  useEffect(() => {

    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllNames(response.data.map(n => n.name.common))
    })

  }, [])



  return (
    <div>
      <SearchBar setNewFilter={setNewFilter}/>
    </div>
  )

}

export default App
