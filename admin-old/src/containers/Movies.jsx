import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import { IoCreateOutline } from 'react-icons/io5';
import queryString from 'query-string';
import styled from 'styled-components';

// Redux
import { useSelector } from 'react-redux';

// hooks
import { useMovies } from '../hooks/useMovie';

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

  const { base_url } = useSelector((state) => state.config);
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { isLoading, data: movies } = useMovies(params.page, option.value);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
  }, []);

  // If loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Movies</title>
      </Helmet>
      <div className="flex flex-col gap-8 py-24 px-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Header title="movies" size="2" style={{ marginBottom: 0 }} />
          <div className="flex flex-wrap items-center gap-6">
            <SearchBar />
            <Link to="/create-movie?type=Create">
              <Button title="Add Movie" Icon={IoCreateOutline} left solid />
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
      </div>
    </>
  );
};

export default Movies;
