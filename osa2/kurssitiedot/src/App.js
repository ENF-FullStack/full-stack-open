const Course = (props) => {
  const { course } = props
  console.log(course)
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Content = ({ parts }) => {
  const p = parts
  return (
    <div>
        {p.map(part =>
          <Part key={part.id} name={part.name} exercise={part.exercises} />
          )}
    </div>
  )
}

const Part = ({ name, exercise}) => {
  return (
    <p>{name} {exercise}</p>
  )
}

const Total = ({ parts }) => {
  
  const t = parts.reduce((previousValue,currentValue) => previousValue + currentValue.exercises,0,);

  return (
    <div>
      <p>
        <strong>Number of exercises {t}</strong>
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App