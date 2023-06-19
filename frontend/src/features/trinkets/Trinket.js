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
    const handleSingleTrinket = () => navigate(`/trinkets/${trinketId}`)
    
    if (trinket) {

        return (
            <section onClick={handleSingleTrinket}>
                <h1>
                    {trinket.name}
                </h1>
                <img src={require('../../images/duck.jpg')} alt="a duck" />
                <p className="price">
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
const memoizedTrinket = memo(Trinket)
export default memoizedTrinket