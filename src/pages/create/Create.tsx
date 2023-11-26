//styles
import "./Create.scss"
//react
import { useEffect, useState } from "react"
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
    const [assignedUsers, setAssignedUsers] = useState<{ value: UserDocument, label: string }[] | []>([])

    //asign users
    const { documents } = useCollection("users")
    const [users, setUsers] = useState<{ value: UserDocument, label: string }[] | []>([])

    const categories = [
        { value: 'development', label: 'Development' },
        { value: 'design', label: 'Design' },
        { value: 'sales', label: 'Sales' },
        { value: 'marketing', label: 'Marketing' },
    ]


    useEffect(() => {

        if (documents) {
            const options = documents.map((user) => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
                        required
                        onChange={(option) => setCategory(option?.value)}
                    />
                </label>
                <label>
                    <span>Assign to</span>
                    <Select
                        options={users}
                        isMulti
                        onChange={(option) => setAssignedUsers([...option])}
                    />
                </label>

                <button className="form-btn create-form__btn">Add Project</button>
            </form>
        </div>
    )
}
