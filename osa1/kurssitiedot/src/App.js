

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
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
const Content = ({part1, part2, part3, exercises1, exercises2, exercises3}) => {
  return (
    <>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </>
  )
}


/// PART component renders the name of a part and number of exercises in it.
const Part = ({part, exercises}) => {

  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  )
}


/// TOTAL component renders the total amount of exercises in the course page.
const Total = ({exercises1, exercises2, exercises3}) => {
  return (
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  )
}

export default App