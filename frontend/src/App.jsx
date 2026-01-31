import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Notes from './components/Notes'
import Addnote from './components/Addnote'
import { BrowserRouter ,Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Route path='/' element={<Notes/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/Register' element={<Register/>}/>
    <Route path='/addnote' element={<Addnote/>}/>
    </BrowserRouter>
  )
}

export default App
