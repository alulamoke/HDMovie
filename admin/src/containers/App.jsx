import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';

// Redux
import { useSelector } from 'react-redux';
import { store } from '../redux/store';
import { init } from '../redux/actions/config.action';
import { getLoggedInAdminInfo, logout } from '../redux/actions/admin.action';

// Utils
import Alert from '../components/Alert/Alert';
import * as ROUTES from '../constant/routes';
import validate from 'validate.js';
import validators from '../utils/validators';
import history from '../history';
import AuthRoute from '../utils/AuthRoute';
import localStore from '../utils/localStore';

// Components
import Sidebar from './Sidebar';
import MenuMobile from './MenuMobile';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowLeft,
  faArrowRight,
  faHome,
  faCalendar,
  faPoll,
  faHeart,
  faDotCircle,
  faStar as fasFaStar,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faLink,
  faPlay,
  faEdit,
  faPlus,
  faFilm,
  faUsers,
  faList,
  faUserEdit,
  faSignInAlt,
  faSignOutAlt,
  faCheckCircle,
  faInfoCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faTrash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';

library.add(
  fab,
  faArrowLeft,
  faArrowRight,
  faHome,
  faCalendar,
  faPoll,
  faHeart,
  faDotCircle,
  fasFaStar,
  farFaStar,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faLink,
  faPlay,
  faEdit,
  faPlus,
  faFilm,
  faUsers,
  faList,
  faUserEdit,
  faSignInAlt,
  faSignOutAlt,
  faCheckCircle,
  faInfoCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faTrash,
  faTimes
);

// Container
const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Signup = lazy(() => import('./Signup'));
const DashBoard = lazy(() => import('./DashBoard'));
const Casts = lazy(() => import('./Casts'));
const Genres = lazy(() => import('./Genres'));
const CreateMovie = lazy(() => import('./CreateMovie'));
const Movies = lazy(() => import('./Movies'));
const Search = lazy(() => import('./Search'));
const Users = lazy(() => import('./Users'));
const Profile = lazy(() => import('./Profile'));
const ShowError = lazy(() => import('./ShowError'));

const MainWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  position: relative;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  user-select: none;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

ReactGA.initialize('UA-137885307-1');
ReactGA.pageview(window.location.pathname + window.location.search);

//init validate
validate.validators = {
  ...validate.validators,
  ...validators,
};

const App = () => {
  const [isMobile, setisMobile] = useState(null);
  const { loading } = useSelector((state) => state.config);
  const { isAuthenticated } = useSelector((state) => state.admin);

  useEffect(() => {
    store.dispatch(init());
  }, []);

  const token = localStore.getToken();
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logout());
        window.history.push(ROUTES.LOGIN);
      } else {
        store.dispatch(getLoggedInAdminInfo());
      }
    }
  }, [token]);

  // Set amount of items to show on slider based on the width of the element
  const changeMobile = () => {
    window.matchMedia('(max-width: 80em)').matches
      ? setisMobile(true)
      : setisMobile(false);
  };

  useEffect(() => {
    changeMobile();
    window.addEventListener('resize', changeMobile);
    return () => window.removeEventListener('resize', changeMobile);
  }, []);

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <Alert />
      <Router history={history}>
        <MainWrapper isMobile={isMobile}>
          {isAuthenticated && (isMobile ? <MenuMobile /> : <Sidebar />)}
          <ContentWrapper>
            <Switch>
              {isAuthenticated && (
                <Route
                  path={ROUTES.HOME}
                  exact
                  render={() => (
                    <Redirect from={ROUTES.HOME} to={ROUTES.DASHBOARD} />
                  )}
                />
              )}
              <Route path={ROUTES.HOME} exact component={Home} />
              <Route path={ROUTES.LOGIN} exact component={Login} />
              <Route path={ROUTES.SIGNUP} exact component={Signup} />
              <AuthRoute path={ROUTES.DASHBOARD} exact component={DashBoard} />
              <AuthRoute path={ROUTES.GET_CASTS} exact component={Casts} />
              <AuthRoute path={ROUTES.GET_GENRES} exact component={Genres} />
              <AuthRoute
                path={ROUTES.CREATE_MOVIE}
                exact
                component={CreateMovie}
              />
              <AuthRoute path={ROUTES.GET_MOVIES} exact component={Movies} />
              <AuthRoute path={ROUTES.SEARCH_MOVIES} exact component={Search} />
              <AuthRoute path={ROUTES.GET_USERS} exact component={Users} />
              <AuthRoute path={ROUTES.ACCOUNT} exact component={Profile} />
              <Route
                path={ROUTES.NOT_FOUND}
                component={() => (
                  <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
                )}
              />
              <Route path={ROUTES.ERROR} component={ShowError} />
              <Route
                component={() => (
                  <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
                )}
              />
            </Switch>
          </ContentWrapper>
        </MainWrapper>
      </Router>
    </Suspense>
  );
};

export default App;
