import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersApiSlice'
import { selectTrinketById, useGetTrinketsQuery } from './trinketsApiSlice'
import Trinket from "./Trinket"

const SingleTrinket = () => {
    const { id } = useParams()

    // const { trinket } = useSelector(state => selectTrinketById(state, id))
    const { trinket } = useGetTrinketsQuery("trinketList", {
        selectFromResult: ({ data }) => ({
            trinket: data?.entities[id]
        })
    })
    console.log(trinket)

    console.log(id)

    const content = trinket ? <Trinket key={id} trinketId={id} /> : <p>Loading...</p>

    return content
}

export default SingleTrinket