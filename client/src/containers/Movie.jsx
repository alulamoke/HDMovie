import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import moviesService from '../services/movie.service';

// Redux
import { useSelector } from 'react-redux';

// Components
import Loader from '../components/Loader';
import MovieImage from '../components/Movie/Details/MovieImage';
import MovieInfo from '../components/Movie/Details/MovieInfo';
import RecommendedMovie from '../components/Movie/RecommendedMovie';

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

const MovieWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  margin-bottom: 7rem;
  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);

  @media ${(props) => props.theme.mediaQueries.largest} {
    max-width: 105rem;
  }

  @media ${(props) => props.theme.mediaQueries.larger} {
    max-width: 110rem;
    margin-bottom: 6rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    max-width: 110rem;
    margin-bottom: 5rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;

//Movie Component
const Movie = () => {
  const { base_url } = useSelector((state) => state.config);

  const { id } = useParams();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const { isLoading, data: movie } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => moviesService.getMovieById(id),
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // If loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${movie.data.title} - HDMovie`}</title>
      </Helmet>
      <MovieWrapper>
        <MovieImage
          base_url={base_url}
          src={movie.data.poster_path}
          alt={movie.data.title}
        />
        <MovieInfo base_url={base_url} movie={movie.data} />
      </MovieWrapper>
      <RecommendedMovie id={id} page={params.page} />
    </Wrapper>
  );
};

export default Movie;
