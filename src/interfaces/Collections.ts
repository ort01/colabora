
//users collection
export interface UserDocument {
    id?: string,
    displayName: string,
    online: boolean,
    photoURL: string
}

//projects collection
export interface ProjectDocument {
    id?: string | null
    uid?: string | null
    name: string
    details: string
    dueDate: string,
    category: string,
    assignedUsers: UserDocument[] | [],
}
