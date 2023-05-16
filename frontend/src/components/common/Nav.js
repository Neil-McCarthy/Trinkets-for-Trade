import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/'>Trinkets</Link>
                <Link to='/'>Sign Up</Link>
                <Link to='/login'>Login</Link>
            </ul>
        </nav>
    )
}


export default Nav;