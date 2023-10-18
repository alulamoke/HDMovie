import dayjs from 'dayjs';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineArrowLeft, AiOutlineLink } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';
import { Element, animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

// Redux
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import castService from '../services/cast.service';
import moviesService from '../services/movie.service';

// Components
import Button from '../components/Button';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Loading from '../components/Loading';
import MoviesList from '../components/MoviesList';
import NotFound from '../components/NotFound';
import SortBy from '../components/SortBy';
import PersonAvatar from '../svg/person.svg';

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

const CastWrapper = styled.div`
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

const CastDetails = styled.div`
  width: 60%;
  padding: 4rem;
  flex: 1 1 60%;

  @media ${(props) => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1rem;
  }

  @media ${(props) => props.theme.mediaQueries.smallest} {
    padding: 0rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 100%;
    flex: 1 1 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 40%;
  flex: 1 1 40%;
  padding: 4rem;

  @media ${(props) => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    margin-bottom: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 60%;
    flex: 1 1 60%;
  }
`;

const MovieImg = styled.img`
  max-height: 100%;
  height: ${(props) => (props.error ? '58rem' : 'auto')};
  object-fit: ${(props) => (props.error ? 'contain' : 'cover')};
  padding: ${(props) => (props.error ? '2rem' : '')};
  max-width: 100%;
  border-radius: 0.8rem;
  box-shadow: ${(props) =>
    props.error ? 'none' : '0rem 2rem 5rem var(--shadow-color-dark);'};
`;

const ImgLoading = styled.div`
  width: 100%;
  max-width: 40%;
  flex: 1 1 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

  @media ${(props) => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const HeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--link-color);
  font-weight: 500;
  margin-bottom: 3rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftButtons = styled.div`
  margin-right: auto;
  display: flex;

  @media ${(props) => props.theme.mediaQueries.small} {
    margin-bottom: 2rem;
  }

  & > *:not(:last-child) {
    margin-right: 2rem;

    @media ${(props) => props.theme.mediaQueries.large} {
      margin-right: 1rem;
    }
  }
`;

const AWrapper = styled.a`
  text-decoration: none;
`;

const Cast = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [option, setOption] = useState({
    value: 'views_count.desc',
    label: 'Popularity',
  });

  const { base_url } = useSelector((state) => state.config);

  const { id } = useParams();
  const location = useLocation();
  const params = queryString.parse(location.search);

  // Fetch person when id on url changes
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
  }, []);

  const { isLoading, data: cast } = useQuery({
    queryKey: ['cast', id],
    queryFn: () => castService.getCastInfo(id),
  });

  const { isLoading: castMoviesLoading, data: castMovies } = useQuery({
    queryKey: ['castMovies', cast?.fullname],
    queryFn: () =>
      moviesService.getMoviesByParams({
        with_cast: cast?._id,
        page: params.page,
        sort_by: option.value,
      }),
    enabled: cast?._id ? true : false,
  });

  // If loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${cast.fullname} - HDMovie`}</title>
      </Helmet>
      <CastWrapper>
        {!loaded ? (
          <ImgLoading>
            <Loading />
          </ImgLoading>
        ) : null}
        <ImageWrapper style={!loaded ? { display: 'none' } : {}}>
          <MovieImg
            src={`${base_url}${cast.imageurl}`}
            alt={cast.fullname}
            error={error ? 1 : 0}
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              setError(true);
              if (e.target.src !== `${PersonAvatar}`) {
                e.target.src = `${PersonAvatar}`;
              }
            }}
          />
        </ImageWrapper>
        <CastDetails>
          <HeaderWrapper>
            <Header
              size="2"
              title={cast.fullname}
              subtitle={renderDate(cast.birthday, cast.deathday)}
            />
          </HeaderWrapper>
          <Heading>The Biography</Heading>
          <Text>
            {cast.biography
              ? cast.biography
              : 'There is no biography available...'}
          </Text>
          <ButtonsWrapper>
            <LeftButtons>{renderWebsite(cast.homepage)}</LeftButtons>
            {renderBack()}
          </ButtonsWrapper>
        </CastDetails>
      </CastWrapper>
      <Header title="Also enters in" subtitle="movies" />
      {renderCastMovies(
        castMoviesLoading,
        base_url,
        castMovies,
        option,
        setOption
      )}
    </Wrapper>
  );
};

function renderDate(birthday, deathday) {
  if (!birthday) {
    return null;
  } else if (birthday && deathday) {
    return `${dayjs(birthday).format('MMM-DD-YYYY')} - ${dayjs(deathday).format(
      'MMM-DD-YYYY'
    )}`;
  } else {
    return dayjs(birthday).format('MMM-DD-YYYY');
  }
}

// Render back button
function renderBack() {
  return (
    <div onClick={history.goBack}>
      <Button title="Back" solid left Icon={AiOutlineArrowLeft} />
    </div>
  );
}

// Render website of person
function renderWebsite(link) {
  if (link.length === 0) {
    return null;
  }
  return (
    <>
      {link.length > 0 &&
        link.map((site, i) => (
          <AWrapper
            key={i}
            target="_blank"
            href={site.account}
            rel="noopener noreferrer"
          >
            <Button title={site.fullname} Icon={AiOutlineLink} />
          </AWrapper>
        ))}
    </>
  );
}

// Render movies where person enters
function renderCastMovies(
  castMoviesLoading,
  base_url,
  movies,
  option,
  setOption
) {
  if (castMoviesLoading) {
    return <Loading />;
  } else if (movies.data.length === 0) {
    return <NotFound title="Sorry!" subtitle={`There are no more movies...`} />;
  } else {
    return (
      <>
        {movies.data.length > 1 && (
          <SortBy option={option} setOption={setOption} />
        )}
        <Element name="scroll-to-element">
          <MoviesList base_url={base_url} movies={movies} />;
        </Element>
      </>
    );
  }
}

export default Cast;
