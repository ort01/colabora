import { useDispatch } from "react-redux"
import "./Home.scss"
import { logout } from "../../redux/authSlice/authSlice"
import { AppDispatch } from "../../redux/store"

export default function Home() {

    const dispatch = useDispatch<AppDispatch>()


    return (
        <div>
            <button onClick={() => { dispatch(logout()) }}>log out</button>
        </div>
    )
}
