
import { Col, Container, Row } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'

const Footer = () => {
    // const navigate = useNavigate()
    const onTextHandler = () => { }
    const onSubmitHandler = () => {
        // navigate('/register')
    }
    return (
        <>
            <div className="footer-top">
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className="latter">
                                <Row>
                                    <Col md={3}>
                                        <h6>NEWS</h6>
                                    </Col>
                                    <Col md={9}>
                                        <div className="sub-left-right">
                                            <form>
                                                <input type="text" value="Enter email here" onChange={onTextHandler} />
                                                <input type="submit" value="SUBSCRIBE" onChange={onSubmitHandler} disabled />
                                            </form>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="latter-right">
                                <Row>
                                    <Col md={6}>
                                        <p>FOLLOW US</p>
                                    </Col>
                                    <Col md={6}>
                                        <ul className="face-in-to">
                                            <li><a><span> </span></a></li>
                                            <li><a><span className="facebook-in"> </span></a></li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


            <div className="footer-bottom">
                <Container>
                    <Row>
                        <Col md={3}>
                            <div className="footer-bottom-cate">
                                <h6>CATEGORIES</h6>
                                <ul>
                                    <li>Curabitur sapien</li>
                                    <li>Dignissim purus</li>
                                    <li>Tempus pretium</li>
                                    <li >Dignissim neque</li>
                                    <li >Ornared id aliquet</li>

                                </ul>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="footer-bottom-cate bottom-grid-cat">
                                <h6>FEATURE PROJECTS</h6>
                                <ul>
                                    <li>Curabitur sapien</li>
                                    <li>Dignissim purus</li>
                                    <li>Tempus pretium</li>
                                    <li >Dignissim neque</li>
                                    <li >Ornared id aliquet</li>

                                </ul>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="footer-bottom-cate">
                                <h6>TOP BRANDS</h6>
                                <ul>
                                    <li>Curabitur sapie</li>
                                    <li>Dignissim puru</li>
                                    <li>Tempus pretiu</li>
                                    <li >Dignissim nequ</li>
                                    <li >Ornared id alique</li>

                                </ul>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="footer-bottom-cate cate-bottom">
                                <h6>OUR ADDERSS</h6>
                                <ul>
                                    <li>Aliquam metus  dui. </li>
                                    <li>orci, ornareidquet</li>
                                    <li> ut,DUI.</li>
                                    <li >nisi, dignissim</li>
                                    <li >gravida at.</li>
                                    <li className="phone">PH : 6985792466</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Footer