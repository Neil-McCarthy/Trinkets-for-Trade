import { useParams } from "react-router-dom"
import { useGetTrinketsQuery } from '../trinkets/trinketsApiSlice'
import { selectUserById, useGetUsersQuery } from './usersApiSlice'
import Trinket from "../trinkets/Trinket"
import Header from "../../components/common/Header"
import Nav from "../../components/common/Nav"
import Footer from "../../components/common/Footer"

const SingleUser = () => {
    const { id } = useParams()

    const { user } = useGetUsersQuery("userList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })
    // const { user } = useGetUsersQuery("userList", {
    //     selectFromResult: ({ data }) => ({
    //         user: data?.entities[trinket.user]
    //     })
    // })
    


    // const content = trinket ? <Trinket key={id} trinketId={id} /> : <p>Loading...</p>

    return (
        <>
            <Header />
            <Nav  isLoggedIn={true} />
            <h1>{user.username}</h1>
            <Footer />
        </>
    )
}

export default SingleUser