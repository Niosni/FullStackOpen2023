import { useState } from 'react'

const FeedbackHeader = () => (<h1>Give Feedback</h1>)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <>
      {props.text} : {props.count}
    </>
  )
}

const Statistics = ({goodFeedback, neutralFeedback, badFeedback, totalFeedback, averageValue}) => {
  const header = <h1>Statistics</h1>

  if (!totalFeedback){
    return (<div>{header} No feedback given</div>)
  }
  const positive = goodFeedback === 0 ? 0 : (goodFeedback / totalFeedback *100)
  return (
    <div>
      {header}
        <ul>
          <li>
            <StatisticLine text="Good" count={goodFeedback}/>
          </li>
          <li>
            <StatisticLine text="Neutral" count={neutralFeedback}/>
          </li>
          <li>
            <StatisticLine text="Bad" count={badFeedback}/>
          </li>

        </ul>
        <p>
          Total: {totalFeedback}
        </p>
        <p>
          Average: {averageValue}
        </p>
        <p>
          Positive: {positive} %
        </p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [goodFeedback, setGoodFeedback] = useState(0)
  const [neutralFeedback, setNeutralFeedback] = useState(0)
  const [badFeedback, setBadFeedback] = useState(0)
  const [totalFeedback, setTotalFeedback] = useState(0)
  const [averageValue, setAverageValue] = useState(0)

  const handleClick = (feedback) => {
    let newGoodFeedback = goodFeedback
    let newNeutralFeedback = neutralFeedback
    let newBadFeedback = badFeedback
    
    if (feedback === 1) {
      setGoodFeedback(++newGoodFeedback)
    } else if (feedback === 0) {
      setNeutralFeedback(++newNeutralFeedback)
    } else if (feedback === -1) {
      setBadFeedback(++newBadFeedback)
    }
    
    const newTotalFeedback = totalFeedback + 1
    setTotalFeedback(newTotalFeedback)
    const newAverageValue = (newGoodFeedback - newBadFeedback) / newTotalFeedback
    setAverageValue(newAverageValue)
  }


  
  return (
    <div>
      <FeedbackHeader />
      <Button handleClick={() => handleClick(1)} text='Good' />
      <Button handleClick={() => handleClick(0)} text='Neutral' />
      <Button handleClick={() => handleClick(-1)} text='Bad' />
      <Statistics 
        goodFeedback={goodFeedback}
        neutralFeedback={neutralFeedback}
        badFeedback={badFeedback}
        totalFeedback={totalFeedback}
        averageValue={averageValue}
      />
    </div>
  )
}

export default App