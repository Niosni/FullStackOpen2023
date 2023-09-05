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
      {props.content.map(content => (
        <Part key={content.name} content={content} />
      ))}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercisesCount}</p>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const content = Array(part1, part2, part3)
  const exercisesCount = countExercises(content)
  
  return (
    <div>
      <Header course={course}/>
      <Content content={content}/>
      <Total exercisesCount={exercisesCount}/>
    </div>
  )
}

export default App