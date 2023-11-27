import { Timestamp } from "firebase/firestore"

//users collection
export interface UserDocument {
    id?: string,
    displayName: string,
    online: boolean,
    photoURL: string
}

//projects collection
export interface ProjectDocument {
    id?: string,
    name: string,
    details: string,
    dueDate: Timestamp,
    category: string,
    assignedUsersList: shrinkedUserObject[],
    comments: string[],
    createdBy: shrinkedUserObject
}




// ---- adjusted user object from create page
interface shrinkedUserObject {
    uid: string,
    displayName: string,
    photoURL: string
}
