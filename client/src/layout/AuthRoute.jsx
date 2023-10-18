import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../containers/Sidebar';
import InnerNavBar from '../components/InnerNavBar';

const AuthRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  return currentUser ? (
    <>
      <InnerNavBar />
      <div className="flex items-start">
        <Sidebar />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRoute;
