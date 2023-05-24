// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTrinketById } from "./trinketsApiSlice";
import { useNavigate } from 'react-router-dom'

const Trinket = ({trinketId}) => {
    const trinket = useSelector(state => selectTrinketById(state, trinketId))
    const navigate = useNavigate()
    
    if (trinket) {

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