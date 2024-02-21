import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './context/TokenShare'

function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  return (
<>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<Auth/>}></Route>
    <Route path='/register' element={<Auth insideRegister/>}></Route>
    <Route path='/dashboard' element={isAuthorised? <Dashboard/>:<Home/>}></Route>
    <Route path='/projects' element={isAuthorised? <Projects/>:<Home/>}></Route>
    <Route path='/*' element={<Navigate to={'/'}/>}></Route>

   </Routes>
   <Footer></Footer>
</>
  )
}

export default App
