import "./UsersSidebar.scss"
//hooks
import { useCollection } from "../../hooks/useCollection"
import { UserDocument } from "../../interfaces/Collections"
import Avatar from "../avatar/Avatar"


export default function UsersSidebar() {

    const { documents, error } = useCollection<UserDocument>("users")

    return (
        <div className="users-list">
            <h2>All users</h2>
            {error && <div className="error">{error}</div>}
            {documents && documents.map((user: UserDocument) => (
                <div key={user.id} className="users-list__user">
                    {user.online && <span className="online" />}
                    <p>{user.displayName}</p>
                    <Avatar src={user.photoURL} />
                </div>
            ))
            }
        </div>
    )
}
