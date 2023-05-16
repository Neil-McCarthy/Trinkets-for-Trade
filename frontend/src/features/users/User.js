import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({userId}) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        return (
            <tr>
                <td>{user.username}</td>
                <td>
                    <button onClick={handleEdit}>
                        Button
                    </button>
                </td>
            </tr>
        )

    } else return null
}

export default User;