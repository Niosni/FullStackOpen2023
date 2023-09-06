import { useState } from 'react'

const Feedback = () => (<h1>Give Feedback</h1>)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({goodFeedback, neutralFeedback, badFeedback}) => {
  console.log(goodFeedback)
  return (
    <div>
      <h1>Statistics</h1>
        <ul>
          <li>
            Good: {goodFeedback}
          </li>
          <li>
            Neutral: {neutralFeedback}
          </li>
          <li>
            Bad: {badFeedback}
          </li>
        </ul>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [goodFeedback, setGoodFeedback] = useState(0)
  const [neutralFeedback, setNeutralFeedback] = useState(0)
  const [badFeedback, setBadFeedback] = useState(0)

  const handleClick = (feedback) => {
    switch (feedback){
      case 'good':
        setGoodFeedback(goodFeedback + 1)
        break;
      case 'neutral':
        setNeutralFeedback(neutralFeedback + 1)
        break;
      case 'bad':
        setBadFeedback(badFeedback + 1)
        break;
    }


  }
  return (
    <div>
      <Feedback />
      <Button handleClick={() => handleClick('good')} text='Good' />
      <Button handleClick={() => handleClick('neutral')} text='Neutral' />
      <Button handleClick={() => handleClick('bad')} text='Bad' />
      <Statistics 
        goodFeedback={goodFeedback}
        neutralFeedback={neutralFeedback}
        badFeedback={badFeedback}/>
    </div>
  )
}

export default App