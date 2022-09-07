import { useState } from 'react'

const Statistics = (props) => {
  const p = props
  const checkP = p.good+p.neutral+p.bad
  if(checkP==0) {
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>
        good {p.good}<br />
        neutral {p.neutral}<br />
        bad {p.bad}<br />
        all {p.good+p.neutral+p.bad}<br />
        average {(p.good-p.bad)/(p.good+p.neutral+p.bad)}<br />
        positive {p.good/(p.good+p.neutral+p.bad)*100} %
        </p>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <button onClick={() => setGood(good + 1)}>
          good
        </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          neutral
        </button>
        <button onClick={() => setBad(bad + 1)}>
          bad
        </button>

      </p>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App