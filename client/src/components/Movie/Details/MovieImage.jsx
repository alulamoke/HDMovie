import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import NothingSvg from '../../../svg/nothing.svg';
import Loading from '../../Loading';

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 40%;
  flex: 1 1 40%;
  align-items: center;
  justify-content: center;
  display: flex;
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
    max-width: 60%;
    flex: 1 1 60%;
  }
`;

const MovieImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: ${(props) => (props.error ? '25rem' : 'auto')};
  object-fit: ${(props) => (props.error ? 'contain' : 'cover')};
  padding: ${(props) => (props.error ? '2rem' : '')};
  border-radius: 0.8rem;
  box-shadow: ${(props) =>
    props.error ? 'none' : '0rem 2rem 5rem var(--shadow-color-dark)'};
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

const MovieImage = ({ base_url, src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <>
      {!loaded ? (
        <ImgLoading>
          <Loading />
        </ImgLoading>
      ) : null}
      <ImageWrapper style={!loaded ? { display: 'none' } : {}}>
        <MovieImg
          src={`${base_url}${src}`}
          alt={alt}
          error={error ? 1 : 0}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            setError(true);
            if (e.target.src !== `${NothingSvg}`) {
              e.target.src = `${NothingSvg}`;
            }
          }}
        />
      </ImageWrapper>
    </>
  );
};

export default MovieImage;
