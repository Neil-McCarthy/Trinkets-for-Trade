import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ({userId}) => {
    
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/users/edit/${userId}`)

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
const memoizedUser = memo(User)
export default memoizedUser;