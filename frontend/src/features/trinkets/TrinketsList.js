import { Link } from "react-router-dom"
import Header from "../../components/common/Header"
import Nav from "../../components/common/Nav"
import Trinket from "./Trinket"
import { useGetTrinketsQuery } from "./trinketsApiSlice"
import Footer from "../../components/common/Footer"


const TrinketsList = () => {

    const {
        data: trinkets,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTrinketsQuery('trinketsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p>{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = trinkets

        const trinketListContent = ids?.length
            ? ids.map(trinketId => <Trinket key={trinketId} trinketId={trinketId} />)
            : null

        content = (
            <section className="display-all-section">
                {trinketListContent}
            </section>
        )
    }

    return (
        <>
            <Header />
            <Nav  isLoggedIn={true} />
            <main>
                <div className="new-trinket">
                    <Link to='/trinkets/newTrinket'>   
                        <h1>
                            Create new trinket +
                        </h1>
                    </Link>
                </div>
                {content}
            </main>
            <Footer />
        </>
    )
}

export default TrinketsList;
