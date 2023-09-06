const EditFilter = ({ newFilter, handleFilter }) => {
  

    const handleNewFilter = (event) => {
  
      handleFilter(event.target.value)
  
    }
  
    return(
      <div>
        filter shown with 
        <input value={newFilter} onChange={handleNewFilter}/>
      </div>
    )
  
}

export default EditFilter