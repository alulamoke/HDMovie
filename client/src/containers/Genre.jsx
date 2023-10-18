import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
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
import SortBy from '../components/SortBy';

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

const Genre = () => {
  const [option, setOption] = useState({
    value: 'views_count.desc',
    label: 'Popularity',
  });

  const { base_url, genres } = useSelector((state) => state.config);

  const { name } = useParams();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const genreId = genres
    .filter((el) => el.name === name)
    .map((el) => el._id)
    .join('');

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
  }, []);

  const { isLoading, data: movies } = useQuery({
    queryKey: ['genre', name],
    queryFn: () =>
      moviesService.getMoviesByParams({
        with_genres: genreId,
        page: params.page,
        sort_by: option.value,
      }),
  });

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
          subtitle={`There were no results for ${name.toLowerCase()} movies...`}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${name} Movies`}</title>
      </Helmet>
      <Header title={name} subtitle="movies" />
      {movies.data.length > 1 && (
        <SortBy option={option} setOption={setOption} />
      )}
      <MoviesList base_url={base_url} movies={movies} />
    </Wrapper>
  );
};

export default Genre;
