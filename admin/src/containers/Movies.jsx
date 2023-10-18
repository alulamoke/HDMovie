import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import queryString from 'query-string';
import styled from 'styled-components';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu } from '../redux/actions/config.action';
import { getMoviesForAdmin, clearMovies } from '../redux/actions/movie.action';

// Components
import Loader from '../components/Loader';
import Header from '../components/Header';
import Button from '../components/Button';
import NotFound from '../components/NotFound';
import MoviesList from '../components/Movie/MoviesList';
import SearchBar from '../components/Movie/SearchBar';
import SortBy from '../components/Movie/SortBy';

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

// Discover Component
const Movies = () => {
  const [option, setOption] = useState({
    value: 'views_count.desc',
    label: 'Popularity',
  });

  const dispatch = useDispatch();
  const { base_url } = useSelector((state) => state.config);
  const movies = useSelector((state) => state.movie);

  const location = useLocation();
  const pathName = location.pathname.split('/')[1];
  const params = queryString.parse(location.search);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    dispatch(getMoviesForAdmin(params.page, option.value));
    return () => dispatch(clearMovies());
  }, [params.page, option.value, dispatch]);

  useEffect(() => {
    dispatch(setSelectedMenu(pathName));
    return () => setSelectedMenu();
  }, [pathName, dispatch]);

  // If loading
  if (movies.loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Movies</title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '3rem',
        }}
      >
        <Header title="movies" size="2" style={{ marginBottom: 0 }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchBar />
          <Link
            to={{ pathname: '/create-movie', state: { type: 'Create' } }}
            style={{ marginLeft: '1rem' }}
          >
            <Button title="Add Movie" icon="plus" left />
          </Link>
        </div>
      </div>
      {movies.data.length > 1 && (
        <SortBy option={option} setOption={setOption} />
      )}
      {movies.data.length > 0 ? (
        <MoviesList base_url={base_url} movies={movies} />
      ) : (
        <NotFound title="Sorry!" subtitle={`There were no results...`} />
      )}
    </Wrapper>
  );
};

export default Movies;
