import { Component, PureComponent, useState } from 'react'

const Button = (props) => {
  return (
      <button onClick={props.handleClick}>
          {props.text}
      </button>
  )
}

const StatisticLine = ({ text, value }) => {
  if(text=="positive")
    return (<div>{text} {value} %</div>)
  else return (<div>{text} {value}</div>)
}

const Statistics = (props) => {
  const p = props
  const checkP = p.good+p.neutral+p.bad
  if(checkP==0) return (<div>No feedback given</div>)
  else {
    return (
      <div>
        <StatisticLine text="good" value={p.good} />
        <StatisticLine text="neutral" value={p.neutral} />
        <StatisticLine text="bad" value={p.bad} />
        <StatisticLine text="all" value={p.good+p.neutral+p.bad} />
        <StatisticLine text="average" value={(p.good-p.bad)/(p.good+p.neutral+p.bad)} />
        <StatisticLine text="positive" value={p.good/(p.good+p.neutral+p.bad)*100} />
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
        <Button
          handleClick={increaseGood}
          text='good'
        />
        <Button
          handleClick={increaseNeutral}
          text='neutral'
        />
        <Button
          handleClick={increaseBad}
          text='bad'
        />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App