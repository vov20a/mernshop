import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'
import useAuth from '../hooks/useAuth'
import DashFooter from './DashFooter'

const Layout = () => {
    const { pathname } = useLocation()
    const [adminPath, setAdminPath] = React.useState(false)

    React.useEffect(() => {
        if (pathname.includes('/dash')) {
            setAdminPath(true)
        } else { setAdminPath(false) }
    }, [pathname])

    return (
        <>
            {adminPath ? <></> : <Header />}
            <Container fluid>
                <Outlet />
            </Container>
            {adminPath ? <DashFooter /> : <Footer />}
        </>
    )
}

export default Layout