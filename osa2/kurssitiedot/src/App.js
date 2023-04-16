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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


/// COURSE component renders a single course with all its sub-components.
const Course = ({course}) => {
  
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}


/// HEADER component renders the main header for the web page.
const Header = ({title}) => {

  return (
    <>
      <h1>{title}</h1>
    </>
  )
}


/// CONTENT component renders the main content of the web page.
const Content = ({parts}) => {
  return (
    <>
      {parts.map(p => <Part part={p} key={p.id} />)}
    </>
  )
}


/// PART component renders the name of a part and number of exercises in it.
const Part = ({part}) => {

  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}


/// TOTAL component renders the total amount of exercises in the course page.
const Total = ({parts}) => {

  const countSum = parts.reduce((sum, parts) => {
    return sum + parts.exercises
  }, 0)

  return (
    <>
      <p>Total number of exercises {countSum}</p>
    </>
  )
}

export default App