import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import { AiOutlineClose } from 'react-icons/ai';
import queryString from 'query-string';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import moviesService from '../services/movie.service';

// Components
import { useQuery } from '@tanstack/react-query';
import Button from '../components/Button';
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

const Discover = () => {
  const { base_url } = useSelector((state) => state.config);

  const { name } = useParams();
  const location = useLocation();

  const params = queryString.parse(location.search);
  const query = name.replace(/\s+/g, '_').toLowerCase();

  const { isLoading, data: movies } = useQuery({
    queryKey: ['discover', query, params.page ?? 1],
    queryFn: () =>
      moviesService.getMoviesByDiscover({
        name: query,
        params: { page: params.page },
      }),
  });

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
  }, [name]);

  // If loading
  if (isLoading) {
    return <Loader />;
  }

  //If there are no results
  else if (movies?.data.length === 0) {
    return (
      <Wrapper>
        <NotFound
          title="Sorry!"
          subtitle={`There were no results for ${name.toLowerCase()} movies...`}
        />
      </Wrapper>
    );
  }

  function renderClearButton() {
    switch (name) {
      case 'My Favorite':
        return (
          <Button
            title="Clear all"
            color="#e20c0c"
            Icon={AiOutlineClose}
            left
            solid
            // onClick={() => dispatch(clearFavoriteMovies())}
            style={{ float: 'right' }}
          />
        );
      case 'Watch Later':
        return (
          <Button
            title="Clear all"
            color="#e20c0c"
            Icon={AiOutlineClose}
            left
            solid
            // onClick={() => dispatch(clearWatchLaterMovies())}
            style={{ float: 'right' }}
          />
        );
      default:
        break;
    }
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${name} Movies`}</title>
      </Helmet>
      <div>
        <Header title={name} subtitle="movies" />
        {renderClearButton()}
      </div>
      <MoviesList base_url={base_url} movies={movies} />
    </Wrapper>
  );
};

export default Discover;
