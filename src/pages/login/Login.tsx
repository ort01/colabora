import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, selectAuth } from "../../redux/authSlice/authSlice"
import { AppDispatch } from "../../redux/store"
import "./Login.scss"

export default function Login() {
    //state
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>('')

    const { loading, error } = useSelector(selectAuth)
    const dispatch = useDispatch<AppDispatch>()

    //functions
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(login({ email, password }))
    }

    return (
        <>
            <div className="login">
                <form className="login__form" onSubmit={handleSubmit}>
                    <h2>Login</h2>

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
                        <button className="form-btn">Login</button>
                    }
                    {error && <p className="error">{error.message}</p>}
                </form>
            </div>
        </>

    )
}
