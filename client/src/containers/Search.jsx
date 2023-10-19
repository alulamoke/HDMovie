import queryString from 'query-string';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

// Redux
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import moviesService from '../services/movie.service';

// Components
import Header from '../components/Header';
import Loader from '../components/Loader';
import MoviesList from '../components/MoviesList';
import NotFound from '../components/NotFound';

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
  const { base_url } = useSelector((state) => state.config);

  const { query } = useParams();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const { isLoading, data: movies } = useQuery({
    queryKey: ['search', query],
    queryFn: () =>
      moviesService.getMoviesBySearch({ q: query, page: params.page }),
  });

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
  }, [query]);

  // If loading
  if (isLoading) {
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
        <Header title={query} subtitle="search results" />
        <MoviesList base_url={base_url} movies={movies} />;
      </Wrapper>
    );
  }
};

export default Search;
