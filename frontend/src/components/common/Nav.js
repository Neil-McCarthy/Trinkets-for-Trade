import { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';


const Nav = (props) => {

    // let isLoggedIn = document.cookie;
    // console.log(isLoggedIn);

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

    let isLoggedIn = false;
    if (props.isLoggedIn === true) {
        isLoggedIn = true
    }

    return (
        <nav>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/trinkets/'>Trinkets</Link>
                <Link to='/users/'>Users</Link>
                {!isLoggedIn && (
                    <Link to='/users/newUser'>Sign Up</Link>
                )}
                {!isLoggedIn && (
                    <Link to='/login'>Login</Link>
                )}
                {isLoggedIn && (
                    <Link onClick={sendLogout} to='/'>Logout</Link>
                )}
            </ul>
        </nav>
    )
}


export default Nav;