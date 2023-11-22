import './App.scss'
//router
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { authState, selectAuth } from './redux/authSlice/authSlice.js'
//firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
//components
import Home from "./pages/home/Home.js"
import Login from "./pages/login/Login.jsx"
import Signup from "./pages/signup/Signup.jsx"
import Create from './pages/create/Create.js'
import Project from './pages/project/Project.js'



function App() {

  const dispatch = useDispatch()
  const { authReady, user } = useSelector(selectAuth)

  const unsub = onAuthStateChanged(auth, (user) => {
    dispatch(authState(user))
    unsub()
  })

  return (
    <>
      {authReady &&
        <BrowserRouter>
          <div className='container'>
            <Routes>
              <Route path="/" element={user ? <Home /> : <Navigate to="login" />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="login" />} />
              <Route path="/project/:id/*" element={user ? <Project /> : <Navigate to="login" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      }
    </>
  )
}

export default App
