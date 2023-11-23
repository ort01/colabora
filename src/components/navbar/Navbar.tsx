//styles
import "./Navbar.scss"
import colabora from "../../assets/colabora.svg"
//react
import { Link } from "react-router-dom"
//redux
import { logout, selectAuth } from '../../redux/authSlice/authSlice.js'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store.js"

export default function Navbar() {

    const { user } = useSelector(selectAuth)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <nav className="navbar">
            <ul>
                <li className="navbar__title">
                    <span>Colabora</span>
                    <img src={colabora} alt="colabora-logo" />
                </li>
                {!user ?
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                    :
                    <li>
                        <button className="navbar__logout" onClick={() => { dispatch(logout()) }}>Logout</button>
                    </li>
                }


            </ul>


        </nav>
    )
}
