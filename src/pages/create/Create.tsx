//styles
import "./Create.scss"
//react
import { useState } from "react"
import Select from "react-select"
//hooks
import { useCollection } from "../../hooks/useCollection"
//ts
import { ProjectDocument, UserDocument } from "../../interfaces/Collections"
//redux
import { Timestamp } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { selectAuth } from "../../redux/authSlice/authSlice"
import { addDocument, selectFirestore } from "../../redux/firestoreSlice/firestoreSlice"
import { AppDispatch } from "../../redux/store"


// function* mapIter<T, U>(iterable: IterableIterator<T>, callback: ((a: T) => U)): Iterable<U> {
//     for (const x of iterable) {
//         yield callback(x);
//     }
// }

export default function Create() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    //form values
    const [name, setName] = useState<string>('')
    const [details, setDetails] = useState<string>('')
    const [dueDate, setDueDate] = useState<string>('')
    const [category, setCategory] = useState<string | undefined>('')
    const [assignedUsers, setAssignedUsers] = useState<UserDocument[] | []>([])
    const [formError, setFormError] = useState<string | null>(null)

    //asign users
    const { documents } = useCollection<UserDocument>("users")

    //redux
    const { user } = useSelector(selectAuth) //get logged in user
    const { fireStoreSliceError } = useSelector(selectFirestore)

    //options
    const categories = [
        { value: 'development', label: 'Development' },
        { value: 'design', label: 'Design' },
        { value: 'sales', label: 'Sales' },
        { value: 'marketing', label: 'Marketing' },
    ]

    //functions
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError("Please select a project category")
            return
        }
        if (!assignedUsers.length) { //empty error = true
            setFormError("Please asign the project to at least 1 user")
            return
        }

        const createdBy = { //current logged in user who created the project
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL
        }

        const assignedUsersList = assignedUsers.map((user) => { // adjusting the assignedusers objects
            return {
                uid: user.id,
                displayName: user.displayName,
                photoURL: user.photoURL
            }
        })

        const project = {
            name: name,
            details: details,
            dueDate: Timestamp.fromDate(new Date(dueDate)),
            category: category,
            assignedUsersList: assignedUsersList,
            comments: [],
            createdBy: createdBy
        }

        //adding the project doc through redux
        await dispatch(addDocument({ colName: "projects", doc: project as ProjectDocument }))
        if (!fireStoreSliceError) {
            navigate("/")
        }
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Details</span>
                    <textarea
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>Set due date</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Category</span>
                    <Select
                        options={categories}
                        onChange={(option) => setCategory(option?.value)}
                    />
                </label>
                <label>
                    <span>Assign to</span>
                    <Select
                        options={documents?.map((doc) => { return { label: doc.displayName, value: doc } })}
                        isMulti
                        onChange={(options) => setAssignedUsers(options.map((option) => option.value))}
                    />
                </label>
                <button className="form-btn create-form__btn">Add Project</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}
