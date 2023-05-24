import Header from "../../components/common/Header"
import Nav from "../../components/common/Nav"
import Trinket from "./Trinket"
import { useGetTrinketsQuery } from "./trinketsApiSlice"


const TrinketsList = () => {

    const {
        data: trinkets,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTrinketsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p>{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = trinkets

        const tableContent = ids?.length
            ? ids.map(trinketId => <Trinket key={trinketId} trinketId={trinketId} />)
            : null

        content = (
            <table>
                <thead>
                    <tr>
                        <th>Trinket name</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <Header />
            <Nav  isLoggedIn={true} />
            {content}
        </>
    )
}

export default TrinketsList;
