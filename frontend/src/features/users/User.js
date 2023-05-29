import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({userId}) => {
    const user = useSelector(state => selectUserById(state, userId))
    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/users/${userId}`)

        return (
            <section>
                <h1>{user.username}</h1>
                    <button onClick={handleEdit}>
                        Edit user
                    </button>
            </section>
        )

    } else return null
}

export default User;