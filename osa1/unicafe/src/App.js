import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <h2>Statistics</h2>
      <p>
        Good {good} <br/>
        Neutral {neutral} <br/>
        Bad {bad} <br/>
        All {good + neutral + bad} <br/>
        Average {(good - bad)/(good + neutral + bad)} <br/>
        Positive {good/(good + neutral + bad)*100} %
      </p>
    </div>
  )
}



export default App