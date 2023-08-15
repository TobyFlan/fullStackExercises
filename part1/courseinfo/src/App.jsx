
//component for page title
const Header = (props) => {

  return (

    <h1>{props.course}</h1>

  )
}

//component used by content to simplify code
const Part = (props) => {

  return (

    <p>{props.part} {props.exercise}</p>

  )

}

//component for page content
const Content = (props) => {

  return (

    <>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </>

  )
}

//component to display total number of exercises
const Total = (props) => {

  return (
    <p>Number of exercises {props.parts[0].exercises + 
                            props.parts[1].exercises + 
                            props.parts[2].exercises}
    </p>

  )
}


//main component
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      
      <Content parts={course.parts}/>

      <Total parts={course.parts}/>

    </div>
  )
}

export default App