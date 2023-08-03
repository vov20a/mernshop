import React from 'react';
import { useAddNewCategoryMutation } from './categoriesApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { ICategory } from '../../types/ICategory';

interface NewCategoryFormProps {
  categories: ICategory[]
}

const NewCategoryForm = ({ categories }: NewCategoryFormProps) => {
  const navigate = useNavigate();

  const [addNewCategory, { isSuccess, isLoading, isError, error }] = useAddNewCategoryMutation();

  const [title, setTitle] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');

  React.useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setCategoryId('');
      navigate('/dash/categories');
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onCategoryIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value);

  const canSave = [title, categoryId].every(Boolean) && !isLoading;

  const onSaveCategoryClicked = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      if (categoryId === String(0)) {
        addNewCategory({ parentCategory: null, title });
      }
      else {
        addNewCategory({ parentCategory: categoryId, title });
      }
    }
  };
  // choose only parents cats
  const options = categories.map((category) => {
    if (category?.parentCategory === null)
      return (
        <option key={category?.id} value={category?.id}>
          {category?.title}
        </option>
      );
    else return (null)
  });

  const errClass = isError ? 'errmsg' : 'offscreen';
  const validTitleClass = !title ? 'form__input--incomplete' : '';


  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveCategoryClicked}>
        <div className="form__title-row">
          <h2>New Category</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
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
          value={categoryId}
          onChange={onCategoryIdChanged}>
          <option value='' disabled>Select...</option>
          {options}
          <option value={0}>Parent Category=null</option>
        </select>
      </form>
    </>
  );

  return content;
};

export default NewCategoryForm;
