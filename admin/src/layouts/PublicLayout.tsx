import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PublicLayout = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {user === undefined ? (
        <main className="mx-auto flex h-full max-w-lg items-center justify-center">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};
