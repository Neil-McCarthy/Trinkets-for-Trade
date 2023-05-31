import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersApiSlice'
import { selectTrinketById } from './trinketsApiSlice'
import Trinket from "./Trinket"

const SingleTrinket = () => {
    const { id } = useParams()

    const trinket = useSelector(state => selectTrinketById(state, id))
    console.log(trinket)

    console.log(id)

    const content = trinket ? <Trinket key={id} trinketId={id} /> : <p>Loading...</p>

    return content
}

export default SingleTrinket