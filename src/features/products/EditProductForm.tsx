import { useState, useEffect, useRef } from "react"
import { useUpdateProductMutation, useDeleteProductMutation } from "./productsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import { IProduct } from "../../types/IProduct"
import { ICategory } from "../../types/ICategory"
import { Button } from "react-bootstrap"
import { categorySimpleFormat } from "../../utils/categorySimpleFormat"

interface EditProductFormProps {
    product: IProduct;
    categories: ICategory[];
}

const EditProductForm = ({ product, categories }: EditProductFormProps) => {

    const { isManager, isAdmin } = useAuth()

    const [updateProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateProductMutation()

    const [deleteProduct, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteProductMutation()

    const navigate = useNavigate()

    const inputFileRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState(product.title)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [rating, setRating] = useState(product.rating)
    const [productImg, setProductImg] = useState(product.productImg)
    const [categoryId, setCategoryId] = useState(product.category._id);
    const [file, setFile] = useState<File>();

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setDescription('')
            setPrice(0)
            setRating(0)
            setCategoryId('')
            setProductImg('')
            setFile(undefined)
            navigate('/dash/products')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            console.log(file)
            setProductImg(file.name)
            setFile(file)
        }
    }
    const handleDeleteFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFile(undefined);
        setProductImg('')
    }

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onDescriptionChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)
    const onPriceChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))
    const onRatingChanged = (e: React.ChangeEvent<HTMLInputElement>) => setRating(Number(e.target.value))
    const onCategoryIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value);

    const canSave = [title, description, price, rating, categoryId].every(Boolean) && !isLoading
    // console.log(product)
    const onSaveProductClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (canSave) {
            let params = {}
            if (!file) {
                params = { id: product.id, category: categoryId, title, description, price, rating, productImg }
            } else {
                params = { id: product.id, category: categoryId, title, description, price, rating, productImg, file }
            }
            await updateProduct(params)
        }
    }

    const onDeleteProductClicked = async () => {
        await deleteProduct({ id: product.id })
    }

    const created = new Date(product.createdAt).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(product.updatedAt).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const categoriesFormat = categorySimpleFormat(categories)
    // console.log('first', categoriesFormat)
    const options = categoriesFormat.map((cats: ICategory[]) => {
        const opts = cats.map((category) => {
            if (cats.length || category?.parentCategory !== null)
                return (
                    <option key={category.id} value={category.id} disabled={(cats.length > 1 && category.parentCategory === null) ? true : false}>
                        {category.title}
                    </option>
                );
            else return (null)
        })
        return opts
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''
    const validPriceClass = !price ? "form__input--incomplete" : ''
    const validRatingClass = !rating ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteProductClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Product</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveProductClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>

                {!file && <Button onClick={() => { if (inputFileRef.current) inputFileRef.current.click() }} variant="success">
                    Загрузить картинку
                </Button>}
                {file && <Button onClick={handleDeleteFile} variant="danger">
                    Удалить картинку
                </Button>}

                <label className="form__label" htmlFor="productImg">
                    Image:{productImg}
                </label>
                <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                <div className="">
                    {file && <img src={URL.createObjectURL(file)} alt='' />}
                    {productImg && <img src={`${process.env.REACT_APP_API_URL}/uploads/${productImg}`} alt='' />}
                </div>

                <label className="form__label" htmlFor="product-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="product-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="product-description">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="product-description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />
                <label className="form__label" htmlFor="product-price">
                    Price:</label>
                <input
                    className={`form__input ${validPriceClass}`}
                    id="product-price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={onPriceChanged}
                />
                <label className="form__label" htmlFor="product-rating">
                    Rating:</label>
                <input
                    className={`form__input ${validRatingClass}`}
                    id="product-rating"
                    name="rating"
                    type="number"
                    value={rating}
                    onChange={onRatingChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            ASSIGNED TO:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select"
                            value={categoryId}
                            onChange={onCategoryIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditProductForm