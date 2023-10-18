import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

// Components
import Button from '../components/Button';
import ErrorSvg from '../svg/error.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${(props) => props.theme.mediaQueries.larger} {
    padding: 0 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 0 2rem;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-bottom: 6rem;
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-weight: 300;
  font-size: 3.5rem;
`;

const Svg = styled.img`
  max-width: 100%;
  height: 35vh;
  margin-bottom: 6rem;
`;

const ShowError = () => {
  const history = useHistory();
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <title>Oooops!</title>
      </Helmet>
      <TitleWrapper>
        <Title>Something went wrong!</Title>
      </TitleWrapper>
      <Svg src={`${ErrorSvg}`} alt="Not found" />
      <Button
        title="Go Back"
        icon="home"
        left
        solid
        onClick={() => history.goBack()}
      />
    </Wrapper>
  );
};

export default ShowError;
