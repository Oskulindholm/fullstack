

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


/// HEADER component renders the main header for the web page.
const Header = ({course}) => {

  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}


/// CONTENT component renders the main content of the web page.
const Content = ({course}) => {
  return (
    <>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
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
const Total = ({course}) => {
  return (
    <>
      <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
    </>
  )
}

export default App