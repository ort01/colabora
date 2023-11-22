
import "./Signup.scss"
import { useState } from "react"
//redux
import { selectAuth, signup } from "../../redux/authSlice/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store"


export default function Signup() {

    //state
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>('')

    const { loading, error } = useSelector(selectAuth)
    const dispatch = useDispatch<AppDispatch>()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(signup({ email, password, name }))
    }


    return (
        <>
            <div className="signup">
                <form className="signup__form" onSubmit={handleSubmit}>
                    <h2>Signup</h2>

                    <label>
                        <span>display name</span>
                        <input
                            type="text"
                            onChange={(e) => { setName(e.target.value) }}
                            value={name}
                            placeholder="John Doe"
                        />
                    </label>

                    <label>
                        <span>email</span>
                        <input
                            type="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            placeholder="user123@gmail.com"
                        />
                    </label>

                    <label >
                        <span>password</span>
                        <input
                            type="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            placeholder="○○○○○○○○"
                        />
                    </label>
                    {loading ?
                        <button className="form-btn" disabled style={{ opacity: ".5" }}>Loading...</button>
                        :
                        <button className="form-btn">Signup</button>
                    }
                    {error && <p className="error">{error.message}</p>}
                </form>
            </div>
        </>

    )
}