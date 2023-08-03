import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquareParking } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// import { useSelector } from 'react-redux'
// import { selectNoteById } from './notesApiSlice'
import { useGetCategoriesQuery } from './categoriesApiSlice';
import { memo } from 'react';
import { ICategory } from '../../types/ICategory';
import { EntityId } from '@reduxjs/toolkit';

interface CategoryProps {
  categoryId: EntityId;
}

const Category = ({ categoryId }: CategoryProps) => {
  //   const note = useSelector((state) => selectNoteById(state, noteId));
  const { category } = useGetCategoriesQuery('categoriesList', {
    selectFromResult: ({ data }) => ({
      category: data?.entities[categoryId] as ICategory,
    }),
  });

  const navigate = useNavigate();

  if (category) {
    const created = new Date(category.createdAt).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });

    const updated = new Date(category.updatedAt).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });

    const childClass = category.parentCategory !== null ? 'child-category' : '';

    const handleEdit = () => navigate(`/dash/categories/${categoryId}`);

    const handleProductsOfCategory = () => navigate(`/dash/products/cat/${category.id}`);

    return (
      <tr className="table__row">
        <td className={`table__cell note__status ${childClass}`}>{category.title}
          <button className="icon-button" style={{ marginLeft: 5 }} onClick={handleProductsOfCategory} >
            <FontAwesomeIcon icon={faSquareParking} />
          </button>
        </td>
        <td className={`table__cell note__status ${childClass}`}>{category.parentCategory ? category.parentCategory.title : null}</td>
        <td className={`table__cell note__status ${childClass}`}>{created}</td>
        <td className={`table__cell note__status ${childClass}`}>{updated}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedCategory = memo(Category);

export default memoizedCategory;
