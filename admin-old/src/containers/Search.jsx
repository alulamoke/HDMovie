import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import queryString from 'query-string';

// Redux
import { useSelector } from 'react-redux';

// hooks
import { useSearchMovies } from '../hooks/useMovie';

// Components
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import MoviesList from '../components/Movie/MoviesList';

const Search = () => {
  const { base_url } = useSelector((state) => state.config);

  const { query } = useParams();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const { isLoading, data: movies } = useSearchMovies(query, params.page);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
  }, []);

  // If loading
  if (isLoading) {
    return <Loader />;
  }

  //If there are no results
  else if (movies.data.length === 0) {
    return (
      <NotFound
        title="Sorry!"
        subtitle={`There were no results for ${query}...`}
      />
    );
  }

  // Else show the results
  else {
    return (
      <>
        <Helmet>
          <title>{`${query} - search results`}</title>
        </Helmet>
        <div className="flex flex-col gap-8 py-24 px-16">
          <Header title="search results" subtitle={query} />
          <MoviesList base_url={base_url} movies={movies} />;
        </div>
      </>
    );
  }
};

export default Search;
