import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Notes from './components/Notes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
      <Register/>
      <Notes/>
    </>
  )
}

export default App
