import React from 'react'
import { Alert, Col, Form } from 'react-bootstrap'
// import { useAppDispatch } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { createProductsHtmlTable } from '../utils/createProductsHtml';
import { IOrderCreate, IProductInfo } from '../types/IOrder';
import { useAddNewOrderMutation } from '../features/orders/ordersApiSlice';
// import { useAppDispatch } from '../app/store';
import { /*removeProductAll,*/ selectAllCart } from '../features/cart/cartSlice';
import { PulseLoader } from 'react-spinners';
import { useAddOrderMailMutation } from '../features/mails/mailsApiSlice';
import { useSelector } from 'react-redux';
import { IProduct } from '../types/IProduct';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';


interface AuthOrderFormProps {
    user: { username: string, email: string, id: string };
    // productsInfo: IProductInfo[];
    // totalPrice: number;
}

const OrderForm: React.FC<AuthOrderFormProps> = ({ user }) => {
    const { removeProductAll } = useActions()
    const {
        // ids, entities,
        totalPrice } = useAppSelector(state => state.cart)

    //можно применить  useSelector(selectAllCart) или (и)  useAppSelector(state => state.cart)

    const cart = useSelector(selectAllCart) as unknown as IProduct[]
    const productsInfoInit: IProductInfo[] = cart.map((product) => {
        return { product, count: product.count ?? 1 }
    })

    const [productsInfo, setProductsInfo] = React.useState<IProductInfo[]>(productsInfoInit)

    // const dispatch = useAppDispatch()


    React.useEffect(() => {
        const productsInfoInit: IProductInfo[] = cart.map((product) => {
            return { product, count: product.count ?? 1 }
        })
        setProductsInfo(productsInfoInit)
    }, [totalPrice, cart])


    const [addNewOrder, { isSuccess, isLoading, isError, error }] = useAddNewOrderMutation()
    const [addOrderMail, { isSuccess: isSuccessMail, isLoading: isLoadingMail, error: errorMail }] = useAddOrderMailMutation()

    React.useEffect(() => {

        if (isSuccess) {
            // dispatch(removeProductAll())
            removeProductAll()
            // navigate('/home')
        }

    }, [isSuccess])


    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: '',
            phone: '',
        },
        //valid after change somthing in form
        mode: 'onChange',
    });
    let content;
    let cnt;

    if (isLoading || isLoadingMail) cnt = <PulseLoader color={'#000'} className="pulse-loader" />;

    const onSubmit = async (values: { phone: string, fullName: string }) => {
        const productsHtml = createProductsHtmlTable(productsInfo, totalPrice);

        const { email, id } = user

        const canSave = [productsInfo, values.fullName, email, values.phone, user, totalPrice].every(Boolean) && !isLoading


        const params: IOrderCreate = {
            // productsInfo, fullName, email, phone, user, totalPrice
            fullName: values.fullName, email, phone: values.phone, productsInfo, totalPrice, user: id
            //        
        }
        // console.log(params)
        if (canSave) {
            await addNewOrder(params)
            await addOrderMail({ email, message: `<h2>Hello ${values.fullName}</h2>${productsHtml}` })
        }
    };


    const errClass = (isError) ? "errmsg" : "offscreen"
    const errContent = error?.data?.message ?? ''
    const errContentMail = errorMail?.data?.message ?? ''


    content = (
        <Col >
            <p className={errClass}>{errContent}</p>
            <p className={errClass}>{errContentMail}</p>

            {isSuccess && isSuccessMail ? <Alert variant='primary'>
                Order created! The message have been sending to you!
            </Alert>
                :
                cart.length > 0 &&
                <>
                    <h4 className="title">
                        <span className="pull-left "><span className="text">Order</span><span
                            className="line"><strong>form</strong></span></span>
                    </h4>
                    <Col lg={12} className='register-form'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Your name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name"
                                    required
                                    isValid={isValid}
                                    {...register('fullName', {
                                        required: 'Укажите имя',
                                        pattern: {
                                            value: /^[A-z]{3,20}$/,
                                            message: 'Неверный формат',
                                        },
                                    })}
                                />
                                <Form.Text className="text-muted" style={{ color: 'red' }}>
                                    {errors.fullName?.message}
                                </Form.Text>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type="tel" placeholder="Enter phone number"
                                    required
                                    isValid={isValid}
                                    {...register('phone', {
                                        required: 'Укажите телефон',
                                        pattern: {
                                            value: /^(\+7|8)( |-)?\d{3}( |-)?\d{3}( |-)?\d{2}( |-)?\d{2}$/,
                                            message: 'Неверный формат',
                                        },
                                    })}
                                />
                                <Form.Text className="text-muted" style={{ color: 'red' }}>
                                    {errors.phone?.message}
                                </Form.Text>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <div className='form-button'>
                                <button type="submit" className="btn btn-cart" disabled={!isValid}>Оформить</button>
                            </div>
                        </Form>
                    </Col>
                </>

            }

        </Col>
    )
    return <>
        {cnt}
        {content}
    </>
}

export default OrderForm