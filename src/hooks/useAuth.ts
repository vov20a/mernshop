import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'
import { IUserInfo } from '../types/IUserInfo'


const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    let isManager = false
    let isAdmin = false
    let status = "Employee"

    if (token) {
        const decoded: IUserInfo = jwtDecode(token)
        const { username, email, roles, id } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { id, username, email, roles, status, isManager, isAdmin }
    }

    return { id: '', username: '', email: '', roles: [], isManager, isAdmin, status }
}
export default useAuth