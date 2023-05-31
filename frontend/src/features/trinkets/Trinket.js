import { useNavigate } from "react-router-dom";
import { useGetTrinketsQuery } from "./trinketsApiSlice";
import { memo } from "react";

const Trinket = ({trinketId}) => {
    
    const { trinket } = useGetTrinketsQuery("trinketsList", {
        selectFromResult: ({ data }) => ({
            trinket: data?.entities[trinketId]
        }),
    })

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
                <button onClick={handleEdit}>
                    View
                </button>
            </section>
        )

    } else return null
}
const memoizedTrinket = memo(Trinket)
export default memoizedTrinket