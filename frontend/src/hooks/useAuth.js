import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { userId, username, userStatus } = decoded.UserInfo

         return { userId, username, userStatus}
    }

    return { userId: 'userId', username: 'username', userStatus: 'userStatus' }
}
export default useAuth