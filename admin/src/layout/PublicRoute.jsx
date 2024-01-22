import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import * as ROUTES from '../constant/routes';

import Sidebar from '../containers/Sidebar';
import MenuNavbar from '../components/MenuNavbar';

const PublicRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  return currentUser ? (
    <Navigate to={ROUTES.DASHBOARD} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
