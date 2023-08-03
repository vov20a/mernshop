import { useGetCategoriesQuery } from './categoriesApiSlice';
import Category from './Category';
// import useAuth from '../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';
import { ICategory } from '../../types/ICategory';
import { EntityState, EntityId } from '@reduxjs/toolkit';
import { categoryFormat } from '../../utils/categoryFormat';
import CategorySelect from './CategorySelect';

const CategoriesList = () => {
  useTitle('Categories List');
  // const { username, isManager, isAdmin } = useAuth();

  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery('categoriesList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  // console.log('first', categories)

  let content;
  let selectContent;
  let tableFamilyContent;

  if (isLoading) content = <PulseLoader color={'#000'} className="pulse-loader" />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = categories as EntityState<ICategory>;

    const arrayAllIds: EntityId[][] = categoryFormat(ids, entities);
    selectContent = ids?.length && arrayAllIds.map((arrayCategoryId: EntityId[], index: number) =>
      <CategorySelect key={index} arrayCategoryId={arrayCategoryId} entities={entities} />);
    // console.log("sec", selectContent)

    const filteredFamilyIds = [...arrayAllIds]
    tableFamilyContent = ids?.length && filteredFamilyIds.map((arrayCategoryId: EntityId[]) =>
      arrayCategoryId.map((categoryId) =>
        <Category key={categoryId} categoryId={categoryId} />));


    // let filteredIds: EntityId[];
    // // if (isManager || isAdmin) {
    // filteredIds = [...ids];
    // // }
    // // else {
    // //   filteredIds = ids.filter((categoriesId) => entities[categoriesId].username === username);
    // // }

    // const tableContent =
    //   ids?.length &&
    //   filteredIds.map((categoryId) => <Category key={categoryId} categoryId={categoryId} />);

    content = (
      <table className="table table__categories">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Title
            </th>
            <th scope="col" className="table__th note__status">
              Parent Category
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th">
              Edit
            </th>
          </tr>
        </thead>
        {/* <tbody>{tableContent}</tbody> */}
        <tbody>{tableFamilyContent}</tbody>
      </table>
    );
  }

  return <>
    {content}
    <h1>Family Categories</h1>
    <hr />
    {selectContent}
    <hr />
  </>;
};
export default CategoriesList;
