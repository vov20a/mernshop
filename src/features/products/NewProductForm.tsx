import React from 'react';
import { useAddNewProductMutation } from './productsApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { ICategory } from '../../types/ICategory';
import { Button } from 'react-bootstrap';
import { categorySimpleFormat } from '../../utils/categorySimpleFormat';


interface NewProductFormProps {
    categories: ICategory[];
}

const NewProductForm = ({ categories }: NewProductFormProps) => {
    const navigate = useNavigate();

    const [addNewProduct, { isSuccess, isLoading, isError, error }] = useAddNewProductMutation();

    const inputFileRef = React.useRef<HTMLInputElement>(null);

    const [title, setTitle] = React.useState('');
    const [productImg, setProductImg] = React.useState('');
    const [rating, setRating] = React.useState<number>(0);
    const [price, setPrice] = React.useState<number>(0);
    const [description, setDescription] = React.useState('');
    const [categoryId, setCategoryId] = React.useState('');
    const [file, setFile] = React.useState<File>();

    React.useEffect(() => {
        if (isSuccess) {
            setTitle('');
            setDescription('');
            setProductImg('');
            setRating(0);
            setPrice(0);
            setCategoryId('');
            setFile(undefined)
            navigate('/dash/products');
        }
    }, [isSuccess, navigate]);


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

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    // const onProductImgChanged = (e: React.ChangeEvent<HTMLInputElement>) => setProductImg(e.target.files[0]);



    const onPriceChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value));
    const onRatingChanged = (e: React.ChangeEvent<HTMLInputElement>) => setRating(Number(e.target.value));
    const onDescriptionChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    const onCategoryIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value);

    const canSave = [title, description, price, rating, categoryId].every(Boolean) && !isLoading && file;

    const onSaveProductClicked = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (canSave) {
            const params = { title, description, price, rating, category: categoryId, file }
            addNewProduct(params);
        }
    };
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


    const errClass = isError ? 'errmsg' : 'offscreen';
    const validTitleClass = !title ? 'form__input--incomplete' : '';
    const validRatingClass = !rating ? 'form__input--incomplete' : '';
    const validPriceClass = !price ? 'form__input--incomplete' : '';
    const validDescriptionClass = !description ? 'form__input--incomplete' : '';

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveProductClicked}>
                <div className="form__title-row">
                    <h2>New Product</h2>
                    <div className="form__action-buttons">
                        <button className="icon-button" title="Save" disabled={!canSave}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
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
                <div className="flex object-cover py-2">
                    {file && <img src={URL.createObjectURL(file)} alt='' />}
                </div>

                <label className="form__label" htmlFor="title">
                    Title:
                </label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={onTitleChanged}
                    autoComplete="on"
                />

                <label className="form__label" htmlFor="price">
                    Price,$:
                </label>
                <input
                    type='number'
                    className={`form__input ${validPriceClass}`}
                    id="price"
                    name="price"
                    value={price}
                    onChange={onPriceChanged}
                />

                <label className="form__label" htmlFor="rating">
                    Rating:
                </label>
                <input
                    type='number'
                    className={`form__input ${validRatingClass}`}
                    id="rating"
                    name="rating"
                    value={rating}
                    onChange={onRatingChanged}
                />

                <label className="form__label" htmlFor="description">
                    Description:
                </label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="category">
                    ASSIGNED TO:
                </label>
                <select
                    id="category"
                    name="category"
                    className="form__select"
                    value={categoryId}
                    onChange={onCategoryIdChanged}>
                    <option value='' disabled>Select...</option>
                    {options}
                </select>
            </form>
        </>
    );

    return content;
};

export default NewProductForm;
