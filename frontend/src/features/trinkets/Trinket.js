// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTrinketById } from "./trinketsApiSlice";
import { useNavigate } from 'react-router-dom'

const Trinket = ({trinketId}) => {
    const trinket = useSelector(state => selectTrinketById(state, trinketId))
    console.log(trinketId, trinket)
    const navigate = useNavigate()
    
    if (trinket) {
        // const created = new Date(trinket.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(trinket.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/trinkets/${trinketId}`)

        return (
            <tr>
                <td>
                    {trinket.name}
                </td>
                <td>
                    {trinket.description}
                </td>
                <td>
                    {trinket.price}
                </td>
                <td>
                    <button onClick={handleEdit}>
                        Edit
                    </button>
                </td>
            </tr>
        )

    } else return null
}

export default Trinket