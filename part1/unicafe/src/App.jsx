import { useState } from 'react'


//button component to handle all clicks
const Button = ({handleClick, text}) => {

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )

}

const Stats = ({good, neutral, bad}) => {

  const total = good+bad+neutral
  const average = (good-bad)/total
  const positive = (good/total)*100

  return(

    <p>
      good {good}<br></br>
      neutral {neutral} <br></br>
      bad {bad} <br></br>
      total {total} <br></br>
      average {average} <br></br>
      positive {positive} %
    </p>

  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //unique event handlers
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1);


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>

      <h1>statistics</h1>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App