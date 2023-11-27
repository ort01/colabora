//styles
import "./Create.scss"
//react
import { useState } from "react"
import Select from "react-select"
//hooks
import { useCollection } from "../../hooks/useCollection"
//ts
import { UserDocument } from "../../interfaces/Collections"

// function* mapIter<T, U>(iterable: IterableIterator<T>, callback: ((a: T) => U)): Iterable<U> {
//     for (const x of iterable) {
//         yield callback(x);
//     }
// }

export default function Create() {
    //form values
    const [name, setName] = useState<string>('')
    const [details, setDetails] = useState<string>('')
    const [dueDate, setDueDate] = useState<string>('')
    const [category, setCategory] = useState<string | undefined>('')
    const [assignedUsers, setAssignedUsers] = useState<UserDocument[] | []>([])
    const [formError, setFormError] = useState<string | null>(null)

    //asign users
    const { documents } = useCollection("users")

    //options
    const categories = [
        { value: 'development', label: 'Development' },
        { value: 'design', label: 'Design' },
        { value: 'sales', label: 'Sales' },
        { value: 'marketing', label: 'Marketing' },
    ]

    //functions
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

        console.log(category, assignedUsers);

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
