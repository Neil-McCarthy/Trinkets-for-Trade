import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'
import useAuth from '../../hooks/useAuth'

const User = ({activeUserId}) => {

    const {userId} = useAuth()
    console.log({userId})
    
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[activeUserId]
        }),
    })

    const navigate = useNavigate()
    const handleEdit = () => navigate(`/users/edit/${activeUserId}`)
    const handleSingleUser = () => navigate(`/users/${user.id}`)

    if (user) {
        let editFlag = false
        console.log(userId, activeUserId)
        if (userId === activeUserId) {
            editFlag = true
        }

        return (
            <section onClick={handleSingleUser}>
                <h1>{user.username}</h1>
                    {editFlag && <button onClick={handleEdit}>Edit user</button>}
            </section>
        )

    } else return null
}
const memoizedUser = memo(User)
export default memoizedUser;