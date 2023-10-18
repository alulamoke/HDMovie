import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu } from '../redux/actions/config.action';
import {
  getGenres,
  clearGenres,
  deleteGenre,
} from '../redux/actions/genre.action';

// Components
import Loader from '../components/Loader';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import Button from '../components/Button';
import AddGenre from '../components/AddGenre';

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
  margin: auto;
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
const Genres = () => {
  const dispatch = useDispatch();
  const genre = useSelector((state) => state.genre);

  const location = useLocation();
  const pathName = location.pathname.split('/')[1];

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    dispatch(getGenres());
    return () => dispatch(clearGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedMenu(pathName));
    return () => setSelectedMenu();
  }, [pathName, dispatch]);

  // If loading
  if (genre.loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Genres</title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Header title="Genres" size="2" style={{ marginBottom: 0 }} />
        <AddGenre />
      </div>
      {genre.data.length > 0 ? (
        <Table style={{ width: '50rem' }}>
          <TableHead>
            <tr>
              <td>Name</td>
              <td>Actions</td>
            </tr>
          </TableHead>
          {genre.data.map((el) => (
            <TableBody key={el._id}>
              <tr>
                <td>{el.name}</td>
                <td style={{ width: '10rem' }}>
                  <Button
                    title="Delete"
                    color="#e20c0c"
                    icon="trash"
                    left
                    solid
                    onClick={() => dispatch(deleteGenre(el._id))}
                  />
                </td>
              </tr>
            </TableBody>
          ))}
        </Table>
      ) : (
        <NotFound title="Sorry!" subtitle={`There are no genres...`} />
      )}
    </Wrapper>
  );
};

export default Genres;
