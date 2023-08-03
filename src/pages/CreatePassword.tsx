import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useCreatePasswordMutation } from '../features/mails/mailsApiSlice';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useAppDispatch } from '../app/store';
import { setCredentials } from '../features/auth/authSlice';


const CreatePassword: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            password: '',
        },
        //valid after change somthing in form
        mode: 'onChange',
    });

    const [createPassword, { isLoading, isError, error }] = useCreatePasswordMutation()

    const onSubmit = async (values: { password: string }) => {
        const { accessToken } = await createPassword(values).unwrap() as unknown as { accessToken: string };
        if (accessToken) {
            dispatch(setCredentials({ accessToken }));
            navigate('/home')
        }
    };


    return (
        <section >
            <Row>
                <Col md={12}>
                    {isLoading && <PulseLoader color={'#000'} className='pulse-loader' />}
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    {isError && <p className="errmsg">{error?.data?.message}</p>}
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h4 className="title text-center">
                        <span className="pull-left "><span className="text">Restore</span><span className="line"><strong>Password</strong></span></span>
                    </h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label >Password [4-12 (A-z0-9!@#$%)]</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password"

                                required
                                isValid={isValid}
                                {...register('password', { required: 'Укажите пароль', pattern: /^[A-z0-9!@#$%]{4,12}$/ })}
                            />
                            <Form.Text className="text-muted" style={{ color: 'red' }}>
                                {errors.password?.message}
                            </Form.Text>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="secondary" type="submit" disabled={!isValid}>
                            Отправить
                        </Button>
                    </Form>
                </Col>
            </Row>
        </section >
    );
};

export default CreatePassword;


