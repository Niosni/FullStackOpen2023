const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      {props.content.name} {props.content.exercises}
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.content.map(content => (
        <p>
          <Part content={content} key={content.name} />
        </p>
      ))}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercisesCount}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const exercisesCount = exercises1 + exercises2 + exercises3;
  const content = Array(
    {name: part1, exercises: exercises1},
    {name: part2, exercises: exercises2},
    {name: part3, exercises: exercises3}
    )

  return (
    <div>
      <Header course={course}/>
      <Content content={content}/>
      <Total exercisesCount={exercisesCount}/>
    </div>
  )
}

export default App