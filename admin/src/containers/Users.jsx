import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu } from '../redux/actions/config.action';
import { getUsers, clearUsers } from '../redux/actions/user.action';

// Components
import Loader from '../components/Loader';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import Button from '../components/Button';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 6rem 4rem;

  @media ${(props) => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 4rem 2rem;
  }
`;

const Table = styled.table`
  padding: 2rem;
`;

const TableHead = styled.thead`
  font-size: 1.4rem;
  font-weight: 600;
  background: var(--color-primary);
  color: white;
  td {
    padding: 2rem;
  }
`;

const TableBody = styled.tbody`
  font-size: 1.2rem;
  font-weight: normal;
  td {
    padding: 0.8rem;
  }
`;

// Discover Component
const Users = () => {
  const dispatch = useDispatch();
  const { base_url } = useSelector((state) => state.config);
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const pathName = location.pathname.split('/')[1];

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    dispatch(getUsers());
    return () => dispatch(clearUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedMenu(pathName));
    return () => setSelectedMenu();
  }, [pathName, dispatch]);

  // If loading
  if (user.loading) {
    return <Loader />;
  }

  //If there are no results
  else if (user.data && user.data.length === 0) {
    return <NotFound title="Sorry!" subtitle={`There were no results...`} />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Users</title>
      </Helmet>
      <Header title="users" size="2" />
      <Table>
        <TableHead>
          <tr>
            <td>Profile Image</td>
            <td>Full Name</td>
            <td>User Name</td>
            <td>Email Address</td>
            <td>Actions</td>
          </tr>
        </TableHead>
        {user.data.map((el) => (
          <TableBody key={el._id}>
            <tr>
              <td>
                <img
                  style={{
                    width: '6rem',
                    height: '6rem',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                  src={`${base_url}${el.imageurl}`}
                  alt={el.fullname}
                />
              </td>
              <td>{el.fullname}</td>
              <td>{el.username}</td>
              <td>{el.email}</td>
              <td>
                <Button title="Suspend" color="#f78900" solid />
              </td>
            </tr>
          </TableBody>
        ))}
      </Table>
    </Wrapper>
  );
};

export default Users;
