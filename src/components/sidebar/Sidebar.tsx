//styles
import "./Sidebar.scss"
import AddIcon from "../../assets/add_icon.svg"
import HomeIcon from "../../assets/dashboard_icon.svg"
//router
import { NavLink } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__content">
                <div className="sidebar__user">
                    <p>Hey user</p>
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
