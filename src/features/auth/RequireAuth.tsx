import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"


type RequireAuthProps = {
    allowedRoles: string[]
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const location = useLocation()
    const { roles, status } = useAuth()

    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : (status === "Employee") ? <Navigate to="/home" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location, }} replace />
    )

    return content
}
export default RequireAuth