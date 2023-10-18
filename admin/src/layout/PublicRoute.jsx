import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/Home/Navbar';

const PublicRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  return currentUser ? (
    <Navigate to="/discover/popular" state={{ from: location }} replace />
  ) : (
    <div className="w-full h-full flex flex-col">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default PublicRoute;
