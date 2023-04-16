

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
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}


/// HEADER component renders the main header for the web page.
const Header = ({course}) => {

  return (
    <>
      <h1>{course}</h1>
    </>
  )
}


/// CONTENT component renders the main content of the web page.
const Content = ({parts}) => {
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
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
  return (
    <>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </>
  )
}

export default App