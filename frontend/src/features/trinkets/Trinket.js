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
            <section>
                <h1>
                    {trinket.name}
                </h1>
                <img src={require('../../images/duck.jpg')} />
                <p>
                    €{trinket.price}
                </p>
                <br/>
                <p>
                    {trinket.description}
                </p>
            </section>
        )

    } else return null
}

export default Trinket