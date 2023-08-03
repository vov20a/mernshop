
import { Outlet } from 'react-router-dom'
// import DashHeader from './DashHeader'
// import DashFooter from './DashFooter'

const DashLayout = () => {
    return (
        <div>
            {/* <DashHeader /> */}
            <Outlet />
            {/* <DashFooter /> */}
        </div>
    )
}

export default DashLayout