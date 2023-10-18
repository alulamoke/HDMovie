import { lazy, Suspense } from 'react';
import ReactGA from 'react-ga';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { useQueries } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCredentails } from './app/authSlice';
import { setConfiguration, setGenres } from './app/configSlice';
import useNetwork from './hooks/useNetwork';
import configService from './services/config.service';
import usersService from './services/user.service';

// Utils
import AuthRoute from './layout/AuthRoute';
import Layout from './layout/Layout';
import PublicRoute from './layout/PublicRoute';

// Components
import Loader from './components/Loader';
import NotFound from './components/NotFound';
import { toast } from 'react-hot-toast';

// Container
const Home = lazy(() => import('./containers/Home'));
const PricingPlan = lazy(() => import('./containers/PricingPlan'));
const PaymentSuccess = lazy(() => import('./containers/PaymentSuccess'));
const Login = lazy(() => import('./containers/Login'));
const Signup = lazy(() => import('./containers/Signup'));
const Discover = lazy(() => import('./containers/Discover'));
const Genre = lazy(() => import('./containers/Genre'));
const Search = lazy(() => import('./containers/Search'));
const Movie = lazy(() => import('./containers/Movie'));
const Cast = lazy(() => import('./containers/Cast'));
const Profile = lazy(() => import('./containers/Profile'));

const MainWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  user-select: none;
`;

ReactGA.initialize('UA-137885307-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  const dispatch = useDispatch();
  const { isOnline } = useNetwork();

  useQueries({
    queries: [
      {
        queryKey: ['config'],
        queryFn: configService.getConfig,
        onSuccess: (data) => {
          dispatch(setConfiguration(data));
        },
      },
      {
        queryKey: ['genres'],
        queryFn: configService.getGenres,
        onSuccess: (data) => {
          dispatch(setGenres(data));
        },
      },
      {
        queryKey: ['authState'],
        queryFn: usersService.getLoggedInUserInfo,
        onSuccess: (data) => {
          dispatch(setCredentails(data));
        },
      },
    ],
  });

  if (!isOnline) {
    toast.error('No internet connection available.', {
      icon: '☁',
      position: 'bottom-center',
    });
  }

  return (
    <Suspense fallback={<Loader />}>
      <MainWrapper>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* PUBLIC ROUTES */}
            <Route element={<PublicRoute />}>
              <Route index element={<Home />} />
              <Route path="pricing-plan" element={<PricingPlan />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            {/* AUTH ROUTES */}
            <Route element={<AuthRoute />}>
              <Route
                path="payment-success/:TX_Ref"
                element={<PaymentSuccess />}
              />
              <Route path="discover/:name" element={<Discover />} />
              <Route path="genre/:name" element={<Genre />} />
              <Route path="search/:query" element={<Search />} />
              <Route path="movie/:id" element={<Movie />} />
              <Route path="cast/:id" element={<Cast />} />
              <Route path="user" element={<Profile />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={() => (
              <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
            )}
          />
        </Routes>
      </MainWrapper>
    </Suspense>
  );
};

export default App;
