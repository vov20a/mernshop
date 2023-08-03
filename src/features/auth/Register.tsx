import React, { useEffect, useRef, useState } from 'react'
import { useRegisterMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { PulseLoader } from 'react-spinners';
import { setCredentials } from './authSlice';
import { Col, Container, Row } from 'react-bootstrap';
import Category from '../../components/Category';

const USER_REGEX = /^[A-z ]{3,20}$/
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Register = () => {

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false)
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false)
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password, username]);

    const canSave = [validUsername, validEmail, validPassword].every(Boolean) && !isLoading

    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { accessToken } = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername('');
            setEmail('');
            setPassword('');
            navigate('/home');
        } catch (err: any) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password or Username');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized ');
            } else {
                setErrMsg(err.data?.message);
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    };

    const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleToggle = () => setPersist((prev: boolean) => !prev);


    const errClass = errMsg ? 'errmsg' : 'offscreen';
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

    let content;

    if (isLoading) content = (<PulseLoader color={'#000'} className='pulse-loader' />);

    content = (
        <Container>
            <Row>
                <Col md={4}>
                    <Category />
                </Col>
                <Col md={8} style={{ marginTop: '1em' }}>
                    <Row>
                        <Col md={12}>
                            <p ref={errRef} className={errClass} aria-live="assertive">
                                {errMsg}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="container">
                                <div className=" login-right">
                                    <h3>PERSONAL INFORMATION</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <span>User Name<label>*[3-20 letters]</label></span>
                                            <input type="text"
                                                className={`form__input ${validUserClass}`}
                                                id="text"
                                                ref={userRef}
                                                value={username}
                                                onChange={handleUsernameInput}
                                                required />
                                        </div>
                                        <div>
                                            <span>Email Address<label>*[xxx@yyy.zz]</label></span>
                                            <input type="text"
                                                className={`form__input ${validEmailClass}`}
                                                id="email"
                                                value={email}
                                                onChange={handleEmailInput}
                                                required />
                                        </div>
                                        <label htmlFor="persist" className="form__persist">
                                            <input
                                                type="checkbox"
                                                className="form__checkbox checkbox"
                                                id="persist"
                                                onChange={handleToggle}
                                                checked={persist}
                                            />
                                            <i> </i>Trust Me
                                        </label>
                                        <div className="  register-bottom-grid">
                                            <h3>LOGIN INFORMATION</h3>
                                            <div className="mation">
                                                <span>Password<label>*[4-12 (A-z0-9!@#$%)]</label></span>
                                                <input type="password"
                                                    className={`form__input ${validPwdClass}`}
                                                    id="password"
                                                    onChange={handlePwdInput}
                                                    value={password}
                                                    required />
                                            </div>
                                        </div>
                                        <input type="submit" disabled={!canSave} value="SUBMIT" />
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    )

    return content
}

export default Register