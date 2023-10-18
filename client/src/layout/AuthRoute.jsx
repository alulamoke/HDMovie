import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../containers/Sidebar';
import MenuNavbar from '../components/MenuNavbar';

const AuthRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  return currentUser ? (
    <>
      <MenuNavbar />
      <div className="grid grid-cols-6">
        <div className="md:col-span-2 lg:col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-6 md:col-span-4 lg:col-span-5">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRoute;
