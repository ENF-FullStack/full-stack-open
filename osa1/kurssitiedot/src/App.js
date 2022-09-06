const Header = (props) => {
  //console.log(props)
  return <h1>{props.course}</h1>

}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Content = (props) => {

  const p = props.parts

  return (
    <div>
      <Part part={p[0].name} exercise={p[0].exercises} />
      <Part part={p[1].name} exercise={p[1].exercises} />
      <Part part={p[2].name} exercise={p[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  
  const t = props.parts.reduce((previousValue,currentValue) => previousValue + currentValue.exercises,0,);

  return (
    <div>
      <p>
        Number of exercises {t}
      </p>
    </div>
  )
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
    },
  ]
  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

export default App