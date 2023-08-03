import { useState, useEffect } from "react"
import { useAddNewOrderMutation } from "./ordersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { IProduct } from "../../types/IProduct"
import { IProductInfo, IProductInfoCount, ISipmleProductsInfo } from "../../types/IOrder"
import { IUser } from "../../types/IUserType"
import SelectProducts from "../../components/SelectProducts"
import { selectAllProductsCounts } from "../../utils/selectAllProductsCounts"
import { Button } from "react-bootstrap"
import { createProductsInfoMap } from "../../utils/createProductsInfoMap"


interface NewOrderFormProps {
    products: IProduct[];
    users: IUser[];
}
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const PHONE_REGEX = /^(\+7|8)( |-)?\d{3}( |-)?\d{3}( |-)?\d{2}( |-)?\d{2}$/

const NewOrderForm = ({ products, users }: NewOrderFormProps) => {
    // console.log('first', order)


    const [addNewOrder, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewOrderMutation()

    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(false)
    const [userId, setUserId] = useState('')
    const [totalPrice, setTotalPrice] = useState(0);
    const [isOpenCount, setOpenCount] = useState(false);
    //array of product.id[]
    const [productsInfoIds, setProductsInfoIds] = useState<string[]>([])
    //array of {id,count}[]
    const [productsCounts, setProductsCounts] = useState<IProductInfoCount[]>([])
    //Map of productInfo:id=>{product and count} {}
    const [productsInfo, setProductsInfo] = useState<Map<string, IProductInfo>>()
    //array of {value,title}[]
    const [simpleProducts, setSimpleProducts] = useState<ISipmleProductsInfo[]>([])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    useEffect(() => {

        if (isSuccess) {
            setFullName('')
            setEmail('')
            setPhone('')
            setUserId('')
            setProductsInfoIds([])
            setProductsCounts([])
            setProductsInfo({} as Map<string, IProductInfo>)
            setSimpleProducts([])
            setTotalPrice(0)
            setOpenCount(false)
            navigate('/dash/orders')
        }

    }, [isSuccess, navigate])

    useEffect(() => {
        let prdtInfo: Map<string, IProductInfo>;
        //когда productsInfo пустой
        if (!productsInfo?.size) {
            prdtInfo = createProductsInfoMap(products, simpleProducts)
        } else {
            //когда productsInfo уже заполнен 
            const resultProductsInfo = [] as IProductInfo[];
            productsInfo.forEach((item) => {
                resultProductsInfo.push({ product: item.product, count: item.count })
            })
            prdtInfo = selectAllProductsCounts(products, resultProductsInfo)
        }

        setProductsInfo(prdtInfo)

        const arr = [] as IProductInfoCount[]
        simpleProducts.map((item) => {
            const key = item.value as string
            // console.log(key)
            return arr.push({ id: key, count: prdtInfo.get(key)?.count });
        })
        setProductsCounts(arr as IProductInfoCount[]);

        const ids = [] as string[]
        simpleProducts.map((item) => {
            if (item.value) return ids.push(item.value);
            else return undefined
        })
        setProductsInfoIds(ids);

        //empty simpleProduct
        if (!simpleProducts.length) setTotalPrice(0)

    }, [simpleProducts])

    useEffect(() => {
        //изменяем productsInfo
        const setProductsInfoCountNull = (value: IProductInfo, key: string, map: Map<string, IProductInfo>) => {
            map.set(key, { ...value, count: 0 })
        }
        if (productsInfo) productsInfo.forEach(setProductsInfoCountNull)


        let total = 0;
        productsCounts.map((product) => {
            if (product.id && productsInfo?.has(product.id)) {
                const prt = productsInfo.get(product.id)
                if (prt) {
                    const value = { ...prt, count: product.count } as { count: number, product: IProduct }
                    productsInfo.set(product.id, value)
                    setProductsInfo(productsInfo);
                }
            }
            //change totalPrice
            if (product.count && product.id && productsInfo?.has(product.id)) {
                const prt = productsInfo.get(product.id)
                if (prt) {
                    total += product.count * prt.product?.price;
                }
            }
            setTotalPrice(total)
        })
    }, [productsCounts])

    // console.log('P', productsInfo, productsCounts,)

    const onFullNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)
    const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const onPhoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)
    const onUserIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)
    const onTotalPriceChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTotalPrice(Number(e.target.value))
    const onProductIdChanged = (options: { value: string, title: string }[]) => setSimpleProducts(options ?? simpleProducts);
    const onProductCountChanged = (e: React.ChangeEvent<HTMLInputElement>, productId: string | undefined) => {
        if (Number(e.target.value) <= 0) return
        //исключяем неиспользуемые товары
        const selectedProductsInfo = productsCounts.map((product) => {
            let mapArr = {} as { product: IProduct, count: Number }
            if (product.id) {
                const value = productsInfo?.get(product.id)?.product
                let count = product.count
                if (count === 0) count = 1
                if (value && count) {
                    mapArr = { product: value, count: count }
                }
                return mapArr
            }
        })

        const counts = selectedProductsInfo.map((item) => {
            if (productId === item?.product._id) {
                const qty = Number(e.target.value)
                if (qty > 0) return { id: productId, count: qty };
                else return { id: item?.product._id, count: 0 };
            } else return { id: item?.product._id, count: item?.count };
        })

        setProductsCounts(counts as IProductInfoCount[]);

    }

    const canSave = [fullName, email, phone, userId, totalPrice, productsCounts.length].every(Boolean) && !productsCounts.find((product) => product.count === 0) && !isLoading

    const resultProductsCounts = [] as { product: string, count: Number }[];
    productsCounts.forEach((item) => {
        if (item.id && item.count) {
            resultProductsCounts.push({ product: item.id, count: item.count })
        }
    })

    const onSaveOrderClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (canSave) {
            await addNewOrder({ fullName, email, phone, user: userId, totalPrice, productsInfo: resultProductsCounts })
        }
    }


    const onClickOpen = () => {
        if (isOpenCount === false) setOpenCount(true)
    }


    const optionsUsers = users.map((user: IUser) => {
        return (
            <option key={user.id} value={user.id}>
                {user.username}
            </option>
        );
    })

    const errClass = (isError) ? "errmsg" : "offscreen"
    const validFullNameClass = !fullName ? "form__input--incomplete" : ''
    const validEmailClass = !validEmail ? "form__input--incomplete" : ''
    const validPhoneClass = !validPhone ? "form__input--incomplete" : ''
    const validTotalPriceClass = !totalPrice ? "form__input--incomplete" : ''

    const errContent = error?.data?.message ?? ''



    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Add New Order</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveOrderClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>


                <label className="form__label" htmlFor="order-fullName">
                    FullName:</label>
                <input
                    className={`form__input ${validFullNameClass}`}
                    id="order-fullName"
                    name="fullName"
                    type="text"
                    autoComplete="off"
                    value={fullName}
                    onChange={onFullNameChanged}
                />

                <label className="form__label" htmlFor="order-email">
                    Email: <span className="nowrap">[xxx@yyy.zz]</span></label>
                <input
                    className={`form__input  ${validEmailClass}`}
                    id="order-email"
                    name="email"
                    type="text"
                    // autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />
                <label className="form__label" htmlFor="phone">
                    Phone: <span className="nowrap">[+7|8 xxx xxx xx xx]</span></label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="phone"
                    name="phone"
                    type="text"
                    value={phone}
                    onChange={onPhoneChanged}
                />
                <label className="form__label" htmlFor="totalPrice">
                    Total Price:</label>
                <input
                    className={`form__input ${validTotalPriceClass}`}
                    id="totalPrice"
                    name="totalPrice"
                    type="number"
                    value={totalPrice}
                    onChange={onTotalPriceChanged}
                />
                <label className="form__label form__checkbox-container" htmlFor="order-products">
                    CHOOSE PRODUCTS:</label>
                <SelectProducts key={1}
                    products={products}
                    selectedProducts={productsInfoIds} onChangeValue={onProductIdChanged} onCloseCount={setOpenCount} />
                {!isOpenCount ? <Button onClick={onClickOpen} className="form__label form__checkbox-container" >
                    OPEN PRODUCTS COUNT:</Button> :
                    <div style={{ display: "flex" }}>
                        {productsCounts.map((product) =>
                            <div key={product.id}>
                                {product.id && <>
                                    <label style={{ marginLeft: 10 }} className="form__label" htmlFor={`count-${product.id}`}>
                                        {productsInfo?.get(product.id)?.product.title}:</label >
                                    <input
                                        style={{ maxWidth: 100 }}
                                        className={!product.count ? "form__input--incomplete" : `form__input-${product.id}`}
                                        id={`count-${product.id}`}
                                        name={product.id}
                                        type="number"
                                        min={1}
                                        value={product.count}
                                        onChange={(e) => onProductCountChanged(e, product.id)}
                                    />
                                </>}
                            </div>
                        )}
                    </div>
                }

                <div className="form__row">
                    <div className="form__divider" style={{ marginBottom: 10 }}>
                        <label className="form__label form__checkbox-container" htmlFor="username">
                            ASSIGNED TO:</label>
                        <select
                            id="username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            <option value='' disabled>Select...</option>
                            {optionsUsers}
                        </select>
                    </div>
                </div>
            </form>

        </>
    )

    return content
}

export default NewOrderForm