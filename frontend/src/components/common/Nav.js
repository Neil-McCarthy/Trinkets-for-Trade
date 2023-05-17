import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/'>Trinkets</Link>
                <Link to='/users/newUser'>Sign Up</Link>
                <Link to='/login'>Login</Link>
                <Link to='/users/usersList'>All users</Link>
            </ul>
        </nav>
    )
}


export default Nav;