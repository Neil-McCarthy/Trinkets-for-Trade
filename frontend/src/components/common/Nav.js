import { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';


const Nav = (props) => {

    // let isLoggedIn = document.cookie;
    // console.log(isLoggedIn);

    let currentURL = window.location.href
    let trimmedURL = currentURL.replace('http://localhost:3000/', '')

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
                <Link className={trimmedURL === '' ? 'active' : ''} to='/'>Home</Link>
                <Link className={trimmedURL === 'trinkets' ? 'active' : ''} to='/trinkets'>Trinkets</Link>
                <Link className={trimmedURL === 'users' ? 'active' : ''} to='/users'>Users</Link>
                {!isLoggedIn && (
                    <Link className={trimmedURL === 'newUser' ? 'active' : ''} to='/newUser'>Sign Up</Link>
                )}
                {!isLoggedIn && (
                    <Link className={trimmedURL === 'login' ? 'active' : ''} to='/login'>Login</Link>
                )}
                {isLoggedIn && (
                    <Link onClick={sendLogout} to='/'>Logout</Link>
                )}
            </ul>
        </nav>
    )
}


export default Nav;