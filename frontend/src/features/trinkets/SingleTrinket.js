import { useParams } from "react-router-dom"
import { useGetTrinketsQuery } from './trinketsApiSlice'
import Trinket from "./Trinket"
import Header from "../../components/common/Header"
import Nav from "../../components/common/Nav"
import Footer from "../../components/common/Footer"

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

    return (
        <>
            <Header />
            <Nav  isLoggedIn={true} />
            <main className="single-display">
                {content}
            </main>
            <Footer />
        </>
    )
}

export default SingleTrinket