import { useState, useEffect } from "react"
import { useUpdateCategoryMutation, useDeleteCategoryMutation } from "./categoriesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import { ICategory } from "../../types/ICategory"


interface EditCategoryFormProps {
    categories: ICategory[],
    category: ICategory;
}

const EditCategoryForm = ({ categories, category }: EditCategoryFormProps) => {

    const { isManager, isAdmin } = useAuth()

    const [updateCategory, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateCategoryMutation()

    const [deleteCategory, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteCategoryMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(category.title)
    const [parentCategoryId, setParentCategoryId] = useState(category.parentCategory?.id ?? '');

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setParentCategoryId('')
            navigate('/dash/categories')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onCategoryIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setParentCategoryId(e.target.value)


    const canSave = [title, parentCategoryId].every(Boolean) && !isLoading

    const onSaveCategoryClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log(parentCategoryId)
        if (canSave) {
            await updateCategory({ id: category.id, title, parentCategory: parentCategoryId })
        }
    }

    const onDeleteCategoryClicked = async () => {
        await deleteCategory({ id: category.id })
    }

    const created = new Date(category.createdAt).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(category.updatedAt).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    // choose only parents cats
    const options = categories.map((cat) => {
        if (cat?.parentCategory === null)
            return (
                <option key={cat.id} value={cat.id} disabled={cat.id !== category.id ? false : true}>
                    {cat.title}
                </option>
            );
        else return (null)
    });

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''


    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteCategoryClicked}
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
                    <h2>Edit Category</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveCategoryClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>

                {/* <div className="form__title-row">
                    <h2>Choise Category</h2>
                </div> */}
                <label className="form__label" htmlFor="title">
                    Title:
                </label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="parentCategory">
                    ASSIGNED TO:
                </label>
                <select
                    id="parentCategory"
                    name="parentCategory"
                    className="form__select"
                    value={parentCategoryId}
                    onChange={onCategoryIdChanged}>
                    <option value='' disabled>Select...</option>
                    {options}
                    <option value={0}>Parent Category=null</option>
                </select>
                <div className="form__divider">
                    <p className="form__created">Created:<br />{created}</p>
                    <p className="form__updated">Updated:<br />{updated}</p>
                </div>
            </form>
        </>
    );

    return content
}

export default EditCategoryForm