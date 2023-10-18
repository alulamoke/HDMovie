import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import styled from 'styled-components';

// React query
import { useQuery } from '@tanstack/react-query';
import configService from './services/config.service';
import adminService from './services/admin.service';

// Redux
import { useDispatch } from 'react-redux';
import { setCredentails } from './app/authSlice';
import { setConfiguration } from './app/configSlice';

// Utils
import * as ROUTES from './constant/routes';
import AuthRoute from './layout/AuthRoute';
import Layout from './layout/Layout';
import PublicRoute from './layout/PublicRoute';

// Components

import Loader from './components/Loader';
import NotFound from './components/NotFound';

// Container
const Home = lazy(() => import('./containers/Home'));
const Login = lazy(() => import('./containers/Login'));
const Signup = lazy(() => import('./containers/Signup'));
const DashBoard = lazy(() => import('./containers/DashBoard'));
const Casts = lazy(() => import('./containers/Casts'));
const Genres = lazy(() => import('./containers/Genres'));
const CreateMovie = lazy(() => import('./containers/CreateMovie'));
const Movies = lazy(() => import('./containers/Movies'));
const Search = lazy(() => import('./containers/Search'));
const Users = lazy(() => import('./containers/Users'));
const Profile = lazy(() => import('./containers/Profile'));

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  user-select: none;
`;

ReactGA.initialize('UA-137885307-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ['config'],
    queryFn: configService.getConfig,
    onSuccess: (data) => {
      dispatch(setConfiguration(data));
    },
  });

  useQuery({
    queryKey: ['authState'],
    queryFn: adminService.getLoggedInAdminInfo,
    enabled: data ? true : false,
    onSuccess: (data) => {
      dispatch(setCredentails(data));
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <MainWrapper>
        <Routes>
          <Route
            path="*"
            element={
              <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
            }
          />
          <Route path="/" element={<Layout />}>
            {/* PUBLIC ROUTES */}
            <Route element={<PublicRoute />}>
              <Route index element={<Home />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGNUP} element={<Signup />} />
            </Route>

            {/* AUTH ROUTES */}
            <Route element={<AuthRoute />}>
              <Route path={ROUTES.DASHBOARD} element={<DashBoard />} />
              <Route path={ROUTES.GET_CASTS} element={<Casts />} />
              <Route path={ROUTES.GET_GENRES} element={<Genres />} />
              <Route path={ROUTES.CREATE_MOVIE} element={<CreateMovie />} />
              <Route path={ROUTES.GET_MOVIES} element={<Movies />} />
              <Route path={ROUTES.SEARCH_MOVIES} element={<Search />} />
              <Route path={ROUTES.GET_USERS} element={<Users />} />
              <Route path={ROUTES.ACCOUNT} element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </MainWrapper>
    </Suspense>
  );
};

export default App;
