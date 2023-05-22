import { useGetUsersQuery } from "./usersApiSlice";
import User from './User';
import Header from "../../components/common/Header";
import Nav from "../../components/common/Nav";

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
        // console.log(ids)

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
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

export default UsersList;