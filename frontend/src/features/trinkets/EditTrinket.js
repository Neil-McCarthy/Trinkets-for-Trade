import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import EditTrinketForm from './EditTrinketForm'
import { selectTrinketById } from './trinketsApiSlice'

const EditTrinket = () => {
    const { id } = useParams()

    const trinket = useSelector(state => selectTrinketById(state, id))
    const users = useSelector(selectAllUsers)

    const content = trinket && users ? <EditTrinketForm trinket={trinket} users={users} /> : <p>Loading...</p>

    return content
}
export default EditTrinket