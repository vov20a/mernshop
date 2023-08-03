import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const Welcome = () => {
  useTitle('shopper: Welcome');

  const { username, isManager, isAdmin } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(
    date,
  );

  const content = (
    <section className="welcome public">
      <p>{today}</p>

      <h1><Link to="/home" replace>Welcome {username}!</Link></h1>

      <p>
        <Link to="/dash/orders">View orders</Link>
      </p>
      <p>
        <Link to="/dash/orders/new">Add New orders</Link>
      </p>

      <p>
        <Link to="/dash/categories">View categories</Link>
      </p>
      <p>
        <Link to="/dash/categories/new">Add New categories</Link>
      </p>

      <p>
        <Link to="/dash/products">View products</Link>
      </p>

      <p>
        <Link to="/dash/products/new">Add New product</Link>
      </p>

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );

  return content;
};
export default Welcome;
