import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import * as ROUTES from '../constant/routes';

import Sidebar from '../containers/Sidebar';
import MenuNavbar from '../components/MenuNavbar';

const AuthRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  return currentUser ? (
    <>
      <MenuNavbar />
      <div className="grid grid-cols-6">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-6 lg:col-span-5">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to={ROUTES.HOME} state={{ from: location }} replace />
  );
};

export default AuthRoute;
