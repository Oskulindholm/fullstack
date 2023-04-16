

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

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
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
const Content = ({part1, part2, part3}) => {
  return (
    <>
      <Part name={part1.name} exercises={part1.exercises} />
      <Part name={part2.name} exercises={part2.exercises} />
      <Part name={part3.name} exercises={part3.exercises} />
    </>
  )
}


/// PART component renders the name of a part and number of exercises in it.
const Part = ({name, exercises}) => {

  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}


/// TOTAL component renders the total amount of exercises in the course page.
const Total = ({part1, part2, part3}) => {
  return (
    <>
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    </>
  )
}

export default App