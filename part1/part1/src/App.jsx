/* const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises  + props.parts[2].exercises }</p>
    </div>
  )
}

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
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App */

import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>


const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button>

//<img width="100" src={props.src} alt="Submit Form"/>

const App = () => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={decreaseByOne} text="minus" src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.pinimg.com%2F564x%2F9d%2F4a%2F49%2F9d4a49b2b2b9392d3f844c4dbcff52d6.jpg&sp=1726653868T3263e39f592694a0a30b4029e36de0327c23bac670b5e3ff8583d74f7a7fa0ce" />
      <Button onClick={increaseByOne} text="plus" src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.redd.it%2Ffunniest-cat-pictures-you-have-v0-cvk0vuc0hj5a1.jpg%3Fwidth%3D3000%26format%3Dpjpg%26auto%3Dwebp%26s%3D73c395c63462f04c52e1550559dfb9809dd2a599&sp=1726653868T37beb8b62bed6a677f27e6a7628a13c4f5b41c60afec64ff4b695885d539d9bb" />
      <Button onClick={setToZero} text="zero" src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F3b%2F37%2Fcd%2F3b37cd80d4f092ed392b1453b64cf0d0.jpg&sp=1726653868Td52214e34d48717b1df659103edbb9ddcef9142eeb5975ae62793b2b4bf28b2d" />
    </div>
  )
}

export default App