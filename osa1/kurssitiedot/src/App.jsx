const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(content => (
        <Part key={content.name} content={content} />
      ))}
    </div>
  )
}

const Total = (props) => {
  const total = countExercises(props.parts)
  return (
    <p>Number of exercises {total}</p>
  )
}

function countExercises(content) {
  let total = 0
  for (const c of content) {
    total += c.exercises
  }
  return total
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
  
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App