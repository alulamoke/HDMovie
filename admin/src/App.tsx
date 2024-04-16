import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Offline } from "react-detect-offline";

import { useAppDispatch } from "./redux/hooks";
import { setAuth } from "./redux/features/authSlice";
import { useUser } from "./hooks/useUser";

import { AuthLayout } from "./layouts/AuthLayout";
import { PublicLayout } from "./layouts/PublicLayout";

import { PageLoader } from "./components/loading/PageLoader";
import ApiLoader from "./components/loading/ApiLoader";
import { NoContent } from "./components/NoContent";
import { useConfig } from "./hooks/useData";
import { setConfiguration } from "./redux/features/configSlice";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Genres = lazy(() => import("./pages/Genres"));
const Casts = lazy(() => import("./pages/Casts"));
const Movies = lazy(() => import("./pages/Movies"));
const Search = lazy(() => import("./pages/Search"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));

export const App = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data: config } = useConfig();
  const { data: user } = useUser();

  if (isLoading) {
    return <ApiLoader />;
  }

  if (config) {
    dispatch(setConfiguration(config));
  }

  if (user) {
    dispatch(setAuth(user));
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="*"
          element={<NoContent title="404" subtitle="Page not found." />}
        />
        <Route path="/" element={<Outlet />}>
          {/* PUBLIC ROUTES */}
          <Route element={<PublicLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
          {/* AUTH ROUTES */}
          <Route element={<AuthLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="genres" element={<Genres />} />
            <Route path="casts" element={<Casts />} />
            <Route path="movies" element={<Movies />} />
            <Route path="search" element={<Search />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
      <Offline>
        <div className="fixed bottom-0 w-full bg-destructive p-2 text-center text-xs font-medium text-white">
          You're offline right now. Check your connection.
        </div>
      </Offline>
    </Suspense>
  );
};
