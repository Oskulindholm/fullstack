import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {setGood(good + 1)}
  const handleNeutral = () => {setNeutral(neutral + 1)}
  const handleBad = () => {setBad(bad + 1)}

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text={"Good"} handler={handleGood} />
      <Button text={"Neutral"} handler={handleNeutral} />
      <Button text={"Bad"} handler={handleBad} />
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


/// BUTTON component renders a button with a given functionality
const Button = ({text, handler}) => {

  return (
    <>
    <button onClick={handler}>
        {text}
      </button>
    </>
  )
}


/// STATISTICS component renders all statistics related to feedback.
const Statistics = ({good, neutral, bad}) => {

  if (good + neutral + bad <= 0) {
    return (
      <>
        <h2><b>Statistics</b></h2>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <table><tbody>
        <StatisticLine text={"Good"} value={good} />
        <StatisticLine text={"Neutral"} value={neutral} />
        <StatisticLine text={"Bad"} value={bad} />
        <StatisticLine text={"All"} value={good + neutral + bad} />
        <StatisticLine text={"Average"} value={(good - bad)/(good + neutral + bad)} />
        <StatisticLine text={"Positive"} value={(good/(good + neutral + bad)*100).toFixed(1) + " %"} />
      </tbody></table>
    </>
  )
}


/// STATISTICLINE component renders a single statistical variable and its value
const StatisticLine = ({text, value}) => {

  return (
    <>
    <tr><td>{text}</td><td>{value}</td></tr>
    </>
  )
}


export default App