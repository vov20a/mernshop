import logo from '../images/logo.png'
import { useNavigate } from "react-router-dom"
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { PulseLoader } from 'react-spinners'

const DashHeader = () => {
    const navigate = useNavigate();
    const { username, } = useAuth()
    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();


    const onClickLogout = async () => {
        await sendLogout({ username });
        navigate('/login')
    }
    return (
        <div className="header">
            <p className='errClass'>{error?.data?.message}</p>
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
                                            <input type="text" />
                                            <input type="submit" value="SEARCH" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="header-bottom-right">
                                {isLoading ? <PulseLoader color={'#000'} className='pulse-loader' /> :
                                    <div className="account"><a href="login.html"><span> </span>{username ? username : 'YOUR ACCOUNT'}</a></div>}

                                <ul className="login-top">
                                    {username ? <li><button className='button-logout' title="Logout" onClick={onClickLogout}> LOGOUT</button></li> :
                                        <>
                                            <li><Link to='/login'><span> </span>LOGIN</Link></li> |
                                            <li><Link to="/register">SIGNUP</Link></li>
                                        </>
                                    }
                                </ul>
                                <div className="button-logout"><Link to="/dash"><span> </span>DUSH</Link></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default DashHeader