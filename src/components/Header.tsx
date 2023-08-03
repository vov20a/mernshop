
import logo from '../images/logo.png'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { PulseLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { selectTotalPrice } from '../features/cart/cartSlice'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/debounce'


const Header = () => {

    const { pathname } = useLocation()
    const navigate = useNavigate();
    const { username, isManager, isAdmin } = useAuth()
    const [sendLogout, { isLoading }] = useSendLogoutMutation();

    const totalPrice = useSelector(selectTotalPrice)

    const [search, setSearch] = useState('')
    const debounced = useDebounce(search)
    useEffect(() => {
        if (debounced.length > 2) {
            navigate('/search', { state: debounced })
            setSearch('')
        }
    }, [debounced])

    const onClickLogout = async () => {
        await sendLogout({ username });
        navigate('/login')

    }

    return (
        <Container>
            <div className="header">
                <div className="top-header">
                    <div className="container">
                        <Row>
                            <Col sm={8}>
                                <div className="top-header-left">
                                    <ul className="support">
                                        <li><Link to={'/'}><label> </label></Link></li>
                                        <li><Link to={'/'}>24x7 live<span className="live"> support</span></Link></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="top-header-right">
                                    <div className="down-top top-down">
                                        {(isManager || isAdmin) && <div className="button-dash" title="Admin page"><Link to="/dash">DUSH</Link></div>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="bottom-header">
                    <div className="container">
                        <Row>
                            <Col md={6}>
                                <div className="header-bottom-left">
                                    <Row>
                                        <Col lg={6}>
                                            <div className="logo">
                                                <Link to="/home"><img src={logo} alt=" " /></Link>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="search">
                                                <input
                                                    type="text"
                                                    className="search"
                                                    placeholder="Search products..."
                                                    value={search}
                                                    onChange={e => setSearch(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="header-bottom-right" >
                                    <Col md={9}>
                                        {isLoading ? <PulseLoader color={'#000'} className='pulse-loader' /> :
                                            <div className="account"><Link to='/account'>{username && <span> </span>}{username ? 'YOUR ACCOUNT' : ''}</Link></div>}

                                        <ul className="login-top">
                                            {username ? <li><button className='button-logout' title="Logout" onClick={onClickLogout}><span> </span> LOGOUT</button></li> :
                                                <>
                                                    <li><Link to='/login'><span> </span>LOGIN</Link></li> |
                                                    <li ><Link to="register">SIGNUP</Link></li>
                                                </>
                                            }
                                        </ul>
                                    </Col>
                                    <Col md={3}>
                                        {!pathname.includes('/cart') && <div className="cart"><Link to="/cart"><span> </span>{!totalPrice ? `CART` : totalPrice}</Link></div>}
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Header