import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAppDispatch } from '../../app/store';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import usePersist from '../../hooks/usePersist';
import { Col, Container, Row } from 'react-bootstrap';
import Category from '../../components/Category';

const Login = () => {


  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail('');
      setPassword('');
      navigate('/home');
    } catch (err: any) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
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

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev: boolean) => !prev);


  const errClass = errMsg ? 'errmsg' : 'offscreen';

  if (isLoading) return <PulseLoader color={'#000'} className='pulse-loader' />;

  const content = (
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
                  <h3>REGISTERED CUSTOMERS</h3>
                  <p>If you have an account with us, please log in.</p>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <span>Email Address<label>*</label></span>
                      <input type="text"
                        id="email"
                        ref={userRef}
                        value={email}
                        onChange={handleEmailInput}
                        required />
                    </div>
                    <div>
                      <span>Password<label>*</label></span>
                      <input type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required />
                    </div>
                    <label htmlFor="persist" className="form__persist">
                      <input
                        type="checkbox"
                        className="form__checkbox"
                        id="persist"
                        onChange={handleToggle}
                        checked={persist}
                      />
                      Trust Me
                    </label>
                    <Link className="forgot" to="/forgot">Forgot Your Password?</Link>
                    <input type="submit" value="Login" />
                  </form>
                </div>
                <div className=" login-left">
                  <h3>NEW CUSTOMERS</h3>
                  <p>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
                  <Link className="acount-btn" to="/register">Create an Account</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

    </Container>
    // <section className="public">
    //   <header>
    //     <h1>Employee Login</h1>
    //   </header>
    //   <main className="login">
    //     <p ref={errRef} className={errClass} aria-live="assertive">
    //       {errMsg}
    //     </p>

    //     <form className="form" onSubmit={handleSubmit}>
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         className="form__input"
    //         type="text"
    //         id="email"
    //         ref={userRef}
    //         value={email}
    //         onChange={handleEmailInput}
    //         // autoComplete="off"
    //         required
    //       />

    //       <label htmlFor="password">Password:</label>
    //       <input
    //         className="form__input"
    //         type="password"
    //         id="password"
    //         onChange={handlePwdInput}
    //         value={password}
    //         required
    //       />
    //       <button className="form__submit-button">Sign In</button>

    //       <label htmlFor="persist" className="form__persist">
    //         <input
    //           type="checkbox"
    //           className="form__checkbox"
    //           id="persist"
    //           onChange={handleToggle}
    //           checked={persist}
    //         />
    //         Trust This Device
    //       </label>
    //     </form>
    //   </main>
    //   <footer>
    //     <Link to="/">Back to Home</Link>
    //   </footer>
    // </section>
  );

  return content;
};
export default Login;
