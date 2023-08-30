import { useState, useEffect } from 'react'
import axios from 'axios'


//component used for changing/inputting new search queries
const SearchBar = ({setNewFilter}) => {

  const [value, setValue] = useState('')

  const handleInput = (event) => {
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

//component to return expanded info about a single country query
const ExpandInfo = ({ country }) => {

  const [countryInfo, setCountryInfo] = useState(null)


  useEffect(() => {
    //get country info and store into array
    console.log(`changing country to ${country}`)

    // skip if country not defined
    if(country){
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then((response) => {
          setCountryInfo(response.data)
        })
        .catch(
          null
        )
    }

  }, [country])

  //skip the render if countryInfo has not yet been fetched
  if(countryInfo){

    const languages = Object.values(countryInfo.languages);

    return (

      <div>
        <h2>{countryInfo.name.common}</h2>
        <p>
          capital city: {countryInfo.capital}
          <br></br>
          area: {countryInfo.area}
        </p>

        <h3>languages:</h3>
        <ul>
            {languages.map((language, index) => 
            <li key={index}>{language}</li>
          )}
        </ul>

        <img src={countryInfo.flags.png} alt={countryInfo.flags.alt}></img>

      </div>
  
    )

  }




}

//component to read the filter and gather results due to the filter
const FilterResults = ({ allNames, newFilter }) => {


  const toDisplay = allNames.filter(c => c.includes(newFilter))

  if(toDisplay.length === 0){
    return(<p>No countries match your filter.</p>)
  }

  //if there is only one entry to display, give expanded response
  if(toDisplay.length === 1){

    return(
    
      <ExpandInfo country = {toDisplay[0]} />
    
    )
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
