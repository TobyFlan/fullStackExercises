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

//component to return expanded info about a single country query
const ExpandInfo = ({ country }) => {

  const [countryInfo, setCountryInfo] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)
  const weather_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    //get country info and store into array
    console.log(`changing country to ${country}`)

    // skip if country not defined
    if(country){
      //get data for country
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

  useEffect(() => {
    if(countryInfo){
      //get the weather data for the country
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryInfo.capital}&appid=${weather_key}`)
        .then((response) => {
          setWeatherInfo(response.data)
        })
        .catch(
          null
        )
    }
  }, [countryInfo])


  //skip the render if countryInfo has not yet been fetched
  if(countryInfo && weatherInfo){

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

        <h2>Weather in {countryInfo.capital}</h2>
        <p>temperature {(weatherInfo.main.temp - 273.15).toFixed(2)} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}></img>
        <p>wind {weatherInfo.wind.speed} m/s</p>

      </div>
  
    )

  }


}

//component to read the filter and gather results due to the filter
const FilterResults = ({ allNames, newFilter }) => {
  
  const [toDisplay, setToDisplay] = useState([])


  useEffect(() => {
    setToDisplay(allNames.filter(c => c.includes(newFilter)))
  }, [newFilter])


  const handleButtonClick = (country) => {
    setToDisplay([country])
  }


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

      <>
        <h2>Countries</h2>
        <ul>
          {toDisplay.map((c, index) => 
              <li key={index}>
                {c}
                <button onClick={() => handleButtonClick(c)}>show</button>
              </li>
          )}
  
        </ul>
      </>

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
      <FilterResults allNames = {allNames} newFilter = {newFilter}/>
    </div>
  )

}

export default App
