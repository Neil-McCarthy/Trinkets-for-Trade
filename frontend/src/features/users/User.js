import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({userId}) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/users/${userId}`)

        return (
            <tr>
                <td>{user.email}</td>
                <td>
                    <button onClick={handleEdit}>
                        Edit user
                    </button>
                </td>
            </tr>
        )

    } else return null
}

export default User;