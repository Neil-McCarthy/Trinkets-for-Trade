import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewTrinketForm from './NewTrinketForm'

const NewTrinket = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewTrinketForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewTrinket