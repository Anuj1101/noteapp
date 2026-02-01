import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Notes from './components/Notes'
import Addnote from './components/Addnote'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Notes/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/notes' element={<Notes/>}/>
    <Route path='/addnote' element={<Addnote/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
