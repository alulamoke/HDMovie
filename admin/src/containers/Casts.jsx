import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import dayjs from 'dayjs';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu } from '../redux/actions/config.action';
import { getCasts, clearCasts, deleteCast } from '../redux/actions/cast.action';

// Components
import Loader from '../components/Loader';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import Button from '../components/Button';
import AddCast from '../components/AddCast';

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
const Casts = () => {
  const dispatch = useDispatch();
  const { base_url } = useSelector((state) => state.config);
  const cast = useSelector((state) => state.cast);

  const location = useLocation();
  const pathName = location.pathname.split('/')[1];

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    dispatch(getCasts());
    return () => dispatch(clearCasts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedMenu(pathName));
    return () => setSelectedMenu();
  }, [pathName, dispatch]);

  // If loading
  if (cast.loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Casts</title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Header title="Casts" size="2" style={{ marginBottom: 0 }} />
        <AddCast />
      </div>
      {cast.data.length > 0 ? (
        <Table>
          <TableHead>
            <tr>
              <td>Profile Image</td>
              <td>Full Name</td>
              <td>BirthDay</td>
              <td>Biography</td>
              <td>Actions</td>
            </tr>
          </TableHead>
          {cast.data.map((el) => (
            <TableBody key={el._id}>
              <tr>
                <td>
                  <img
                    src={`${base_url}${el.imageurl}`}
                    alt={el.fullname}
                    style={{
                      width: '6rem',
                      height: '6rem',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                </td>
                <td>{el.fullname}</td>
                <td>{dayjs(el.birthday).format('MMM-DD-YYYY')}</td>
                <td
                  style={{
                    maxWidth: '30rem',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {el.biography}
                </td>
                <td>
                  <Button
                    title="Delete"
                    color="#e20c0c"
                    icon="trash"
                    left
                    solid
                    onClick={() => dispatch(deleteCast(el._id))}
                  />
                </td>
              </tr>
            </TableBody>
          ))}
        </Table>
      ) : (
        <NotFound title="Sorry!" subtitle={`There are no casts...`} />
      )}
    </Wrapper>
  );
};

export default Casts;
