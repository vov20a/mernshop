import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// import { useSelector } from 'react-redux'
// import { selectUserById } from './usersApiSlice'
import { useGetUsersQuery } from './usersApiSlice';
import { memo } from 'react';
import { EntityId } from '@reduxjs/toolkit';

type UserProps = {
  userId: EntityId;
}

const User = ({ userId }: UserProps) => {
  // const user = useSelector(state => selectUserById(state, userId))
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {

    const handleEdit = () => navigate(`/dash/users/${userId}`);
    //@ts-ignore
    const userRolesString = user.roles.toString().replaceAll(',', ', ');

    const cellStatus = true ? '' : 'table__cell--inactive';

    return (
      <tr className="table__row user" >
        <td className={`table__cell ${cellStatus}`}> {
          //@ts-ignore
          user.username} </td>
        <td className={`table__cell ${cellStatus}`
        }> {userRolesString} </td>
        < td className={`table__cell ${cellStatus}`
        }>
          <button className="icon-button table__button" onClick={handleEdit} >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr >
    );
  } else return null;

};

const memoizedUser = memo(User);

export default memoizedUser;
