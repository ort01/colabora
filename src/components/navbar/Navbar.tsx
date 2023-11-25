//styles
import colabora from "../../assets/colabora.svg"
import "./Navbar.scss"
//react
import { Link } from "react-router-dom"
//redux
import { useDispatch, useSelector } from "react-redux"
import { logout, selectAuth } from '../../redux/authSlice/authSlice.js'
import { AppDispatch } from "../../redux/store.js"

export default function Navbar() {

    const { user, loading } = useSelector(selectAuth)
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
                        {loading ?
                            <button
                                className="navbar__logout"
                                disabled
                                onClick={() => { dispatch(logout()) }}
                                style={{
                                    opacity: ".5", backgroundColor: "#006884",
                                    color: "#f2f1ef"
                                }}>
                                Logging out...</button>
                            :
                            <button
                                className="navbar__logout"
                                onClick={() => { dispatch(logout()) }}>
                                Logout</button>}
                    </li>
                }


            </ul>


        </nav>
    )
}
