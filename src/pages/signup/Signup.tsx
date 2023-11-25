//styles
import UploadFileIcon from "../../assets/upload-file_icon.svg"
import "./Signup.scss"
//react
import { useState } from "react"
//redux
import { useDispatch, useSelector } from "react-redux"
import { selectAuth, signup } from "../../redux/authSlice/authSlice"
import { AppDispatch } from "../../redux/store"


export default function Signup() {

    //state
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>("")
    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [thumbnailError, setThumbnailError] = useState<string | null>(null)

    const { loading, error } = useSelector(selectAuth)
    const dispatch = useDispatch<AppDispatch>()



    //upload file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThumbnail(null)

        if (e.target.files?.length) { // checking if we even have a file
            const file = e.target.files[0]; //getting the file
            console.log(file); //file {name, size, types

            if (!file.type.includes('image')) { //if the type of file (type: string) doesnt include img
                setThumbnailError('Selected file must be an image')
                return
            }
            if (file.size > 100000) { //if the file is bigger than 100kb
                setThumbnailError('Image file size must be less than 100kb')
                return
            }

            // if everything is ok
            setThumbnailError(null)
            setThumbnail(file)
            console.log('thumbnail updated')

        } else { //if we dont have a file
            setThumbnailError('Please select a file')
            console.log("please select a file");

            return
        }

    }


    //submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(signup({ email, password, name, thumbnail }))
    }





    return (
        <>
            <div className="signup">
                <form className="signup__form" onSubmit={handleSubmit}>
                    <h2>Sign up</h2>

                    <label>
                        <span>email</span>
                        <input
                            type="email"
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            placeholder="user123@gmail.com"
                        />
                    </label>

                    <label >
                        <span>password</span>
                        <input
                            type="password"
                            required
                            autoComplete="true"
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            placeholder="○○○○○○○○"
                        />
                    </label>

                    <label>
                        <span>display name</span>
                        <input
                            type="text"
                            required
                            onChange={(e) => { setName(e.target.value) }}
                            value={name}
                            placeholder="John Doe"
                        />
                    </label>

                    <label>
                        <span>profile thumbnail</span>
                        <input
                            type="file"
                            required
                            onChange={handleFileChange}
                        />
                        <div className="signup__file">
                            <img src={UploadFileIcon} alt="upload-file-icon" />
                            <div>Browse...</div>
                        </div>
                        {thumbnailError && <div className="error">{thumbnailError}</div>}
                        {thumbnail && <div className="signup__file--name">{thumbnail.name}</div>}
                    </label>
                    {loading ?
                        <button
                            className="form-btn"
                            disabled
                            style={{
                                opacity: ".5", backgroundColor: "#006884",
                                color: "#f2f1ef"
                            }}>
                            Loading...
                        </button>
                        :
                        <button className="form-btn">Signup</button>
                    }
                    {error && <p className="error">{error.message}</p>}
                </form>
            </div >
        </>

    )
}