import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import Header from "../../components/common/Header"
import Nav from "../../components/common/Nav"
import Footer from "../../components/common/Footer"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            navigate('/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const canSave = [validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="create-new-form" onSubmit={onSaveUserClicked}>
                <h2>New User</h2>
                <div>
                    <label htmlFor="username">
                        Username: <span>[3-20 letters]</span></label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        Password: <span>[4-12 chars incl. !@#$%]</span></label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />
                </div>
                <button title="Save" disabled={!canSave}>
                    Create New User
                </button>
            </form>
        </>
    )

    return (
        <>
            <Header />
            <Nav isLoggedIn={false} />
            <main className="create-new-main">
                {content}
            </main>
            <Footer />
        </>
    )
}
export default NewUserForm