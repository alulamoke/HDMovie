import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const AuthLayout = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {user !== undefined ? (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />
          <div className="flex flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-2 sm:p-3 lg:gap-6 lg:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};
