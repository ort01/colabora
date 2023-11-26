//styles
import AddIcon from "../../assets/add_icon.svg"
import HomeIcon from "../../assets/dashboard_icon.svg"
import "./Sidebar.scss"
//router
import { NavLink } from "react-router-dom"
//redux
import { useSelector } from "react-redux"
import { selectAuth } from "../../redux/authSlice/authSlice"
//components
import Avatar from "../avatar/Avatar"

export default function Sidebar() {


    const { user } = useSelector(selectAuth)

    return (
        <div className="sidebar">
            <div className="sidebar__content">
                <div className="sidebar__user">
                    <Avatar src={user?.photoURL as string} />
                    <p>Hello <span className="sidebar__user--name">{user?.displayName}</span></p>
                </div>
                <nav className="sidebar__links">
                    <ul>
                        <li>
                            <NavLink to="/">
                                <img src={HomeIcon} alt="dashboard-icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="add-icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
