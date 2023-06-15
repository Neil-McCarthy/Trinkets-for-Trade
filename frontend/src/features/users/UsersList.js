import { useGetUsersQuery } from "./usersApiSlice";
import User from './User';
import Header from "../../components/common/Header";
import Nav from "../../components/common/Nav";
import Footer from "../../components/common/Footer";

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p>{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const usersListContent = ids?.length
            ? ids.map(userId => <User key={userId} activeUserId={userId} />)
            : null

        content = (
            <section className="display-all-section">
                {usersListContent}
            </section>
        )
    }

    return (
        <>
            <Header />
            <Nav  isLoggedIn={true} />
            <main>
                {content}
            </main>
            <Footer />
        </>
    )
}

export default UsersList;