import { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';


const Nav = () => {

    const navigate = useNavigate()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>


    return (
        <nav>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/'>Trinkets</Link>
                <Link to='/users/newUser'>Sign Up</Link>
                <Link to='/login'>Login</Link>
                <button onClick={sendLogout}>Logout</button>
                <Link to='/users/usersList'>All users</Link>
            </ul>
        </nav>
    )
}


export default Nav;