import './App.scss'
//router
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { authState, selectAuth } from './redux/authSlice/authSlice.js'
//firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
//components
import { useEffect } from 'react'
import Navbar from './components/navbar/Navbar.js'
import Sidebar from './components/sidebar/Sidebar.js'
import Create from './pages/create/Create.js'
import Home from "./pages/home/Home.js"
import Login from "./pages/login/Login.jsx"
import Project from './pages/project/Project.js'
import Signup from "./pages/signup/Signup.jsx"



function App() {

  const dispatch = useDispatch()
  const { authReady, user } = useSelector(selectAuth)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(authState(user))
      unsub()
    },
      (error) => {
        console.log(error)
      })
  }, [dispatch])


  return (
    <div className='app'>
      {authReady &&
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='app__container'>
            <Navbar />
            <Routes>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
              <Route path="/project/:id/*" element={user ? <Project /> : <Navigate to="/login" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      }
    </div>
  )
}

export default App
