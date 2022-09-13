const Course = ({ course }) => {
    console.log(course)
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Header = ({ name }) => {
    return <strong>{name}</strong>
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

  export default Course