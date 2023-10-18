import React from 'react';
import { Element } from 'react-scroll';
import { useQuery } from '@tanstack/react-query';

// Redux
import { useSelector } from 'react-redux';
import moviesService from '../../services/movie.service';

// Components
import Header from '../Header';
import Loading from '../Loading';
import MoviesList from '../MoviesList';
import NotFound from '../NotFound';

const RecommendedMovie = ({ id, page }) => {
  const { base_url } = useSelector((state) => state.config);

  const { isLoading, data: recommendedMovie } = useQuery({
    queryKey: ['recommendedMovies', id],
    queryFn: () => moviesService.getRecommendationMovies(id, page),
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <>
      <Header title="Recommended" subtitle="movies" />
      {renderRecommended()}
    </>
  );

  // Render recommended movies
  function renderRecommended() {
    if (isLoading) {
      return <Loading />;
    } else if (recommendedMovie.data.length === 0) {
      return (
        <NotFound
          title="Sorry!"
          subtitle={`There are no recommended movies...`}
        />
      );
    } else {
      return (
        <Element name="scroll-to-element">
          <MoviesList base_url={base_url} movies={recommendedMovie} />;
        </Element>
      );
    }
  }
};

export default RecommendedMovie;
