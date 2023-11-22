import './App.scss'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { authState, selectAuthReady } from './redux/authReducer/auth'

//firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'


function App() {
  const dispatch = useDispatch()
  const authReady = useSelector(selectAuthReady)

  console.log(authReady);

  const unsub = onAuthStateChanged(auth, (user) => {
    dispatch(authState(user))
    unsub()
  })


  return (
    <>
      {authReady &&
        <div className='App'>
          Hello
        </div>
      }
    </>
  )
}

export default App
