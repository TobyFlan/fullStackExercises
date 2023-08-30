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

//component to display filter results to the screen in li format
const DisplayResults = ({ toDisplay }) => {

  return(
    <>
      <h2>Countries</h2>
      <ul>
        {toDisplay.map(c => 
            <li key={c}>
              {c}
            </li>
          )}

      </ul>
    </>
  )

}


//component to read the filter and gather results due to the filter
const FilterResults = ({ allNames, newFilter }) => {

  const toDisplay = allNames.filter(c => c.includes(newFilter))

  if(toDisplay.length === 0){
    return(<p>No countries match your filter.</p>)
  }

  if(toDisplay.length <= 10){
    return (
      
        <DisplayResults toDisplay = {toDisplay} />

      )
  }

  return(<p>Too many matches. Specify another filter.</p>)

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
      setAllNames(response.data.map(n => n.name.common.toLowerCase()))
    })
    .catch(() => {
      console.log(`error: there was a problem getting country names from the helsinki API`)
    })

  }, [])


  


  return (
    <div>
      <SearchBar setNewFilter={setNewFilter}/>
      <FilterResults allNames = {allNames} newFilter = {newFilter} />
    </div>
  )

}

export default App
