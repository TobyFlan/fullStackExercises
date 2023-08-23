const ListFilter = (props) => {

    const toDisplay = props.persons.filter((person) => 
      person.name.toLowerCase().includes(props.filter.toLowerCase()) 
    )
  
    return (
      <>
        <h2>Numbers</h2>
        <ul>
        {toDisplay.map((persons) => 
          <li key = {persons.name}> 
            <span>
              {persons.name} {persons.number}
            </span> 
          </li>
        )}
        </ul>
      </>
    )
}

export default ListFilter