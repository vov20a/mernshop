import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useCheckEmailMutation } from '../features/mails/mailsApiSlice';
import { PulseLoader } from 'react-spinners';


const ForgotPwd: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
        },
        //valid after change somthing in form
        mode: 'onChange',
    });
    const [checkEmail, { isSuccess, isLoading, isError, error }] = useCheckEmailMutation()

    const onSubmit = async (values: { email: string }) => {
        const email = await checkEmail(values)
    };

    return (
        <section >
            <Row>
                <Col md={12}>
                    {isLoading && <PulseLoader color={'#000'} className='pulse-loader' />}
                </Col>
            </Row>
            <Row>

            </Row>
            <Row>
                <Col md={12}>
                    {isError && <p className="errmsg">{error?.data?.message}</p>}
                </Col>
            </Row>
            {isSuccess ? <Col md={12}>
                <h3>Mail was send to your email</h3>
            </Col> : <Row className="justify-content-md-center">
                <Col md={4}>
                    <h4 className="title text-center">
                        <span className="pull-left "><span className="text">Restore</span><span className="line"><strong>Password</strong></span></span>
                    </h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                required
                                isValid={isValid}
                                {...register('email', {
                                    required: 'Укажите почту', pattern: /\w+@\w+\.\w+/
                                })}
                            />
                            < Form.Text className="text-muted" >
                                {errors.email?.message}
                            </Form.Text>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <div className='form-button'>
                            <Button variant="secondary" type="submit" disabled={!isValid}>
                                Отправить email
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>}

        </section >
    )
};

export default ForgotPwd


