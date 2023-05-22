// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTrinketById } from "./trinketsApiSlice";

const Trinket = (trinketId) => {
    const trinket = useSelector(state => selectTrinketById(state, trinketId))

    // const navigate = useNavigate()

    if (trinket) {
        // const created = new Date(trinket.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(trinket.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const handleEdit = () => navigate(`/trinkets/${trinketId}`)

        return (
            <section>
                <h1>
                    trinket.name
                    trinket.description
                </h1>
            </section>
        )

    } else return null
}

export default Trinket