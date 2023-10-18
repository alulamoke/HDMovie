import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import queryString from 'query-string';
import styled from 'styled-components';
import history from '../history';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getMoviesBySearch, clearMovies } from '../redux/actions/movie.action';

// Components
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import MoviesList from '../components/Movie/MoviesList';
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

const Search = () => {
  const dispatch = useDispatch();
  const { base_url } = useSelector((state) => state.config);
  const movies = useSelector((state) => state.movie);

  const { query } = useParams();
  const location = useLocation();
  const params = queryString.parse(location.search);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    dispatch(getMoviesBySearch(query, params.page));
    return () => dispatch(clearMovies());
  }, [query, params.page, dispatch]);

  // If loading
  if (movies.loading) {
    return <Loader />;
  }

  //If there are no results
  else if (movies.data.length === 0) {
    return (
      <Wrapper>
        <NotFound
          title="Sorry!"
          subtitle={`There were no results for ${query}...`}
        />
      </Wrapper>
    );
  }

  // Else show the results
  else {
    return (
      <Wrapper>
        <Helmet>
          <title>{`${query} - search results`}</title>
        </Helmet>
        <Header title="search results" subtitle={query} />
        {history.action === 'PUSH' && (
          <div>
            <Button
              title="Back"
              icon="arrow-left"
              left
              solid
              style={{ float: 'right' }}
              onClick={() => history.goBack()}
            />
          </div>
        )}
        <MoviesList base_url={base_url} movies={movies} />;
      </Wrapper>
    );
  }
};

export default Search;
