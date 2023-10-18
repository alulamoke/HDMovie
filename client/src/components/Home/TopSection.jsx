import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Componenst
import Button from '../Button';
import Marginer from '../Marginer';
import BackGroundImg from '../../svg/bg2.jpg';

const Wrapper = styled.div`
  width: 100%;
  height: 70vh;
  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)),
    url(${BackGroundImg}) no-repeat fixed center center/cover;
  overflow: hidden;

  @media ${(props) => props.theme.mediaQueries.large} {
    height: 60vh;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    height: 50vh;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    height: 40vh;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin: auto;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Slogan = styled.h1`
  color: var(--text-color);
  font-size: 4.5rem;
  letter-spacing: 0.5px;

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 3.5rem;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    font-size: 2.8rem;
  }
`;

const Discription = styled.p`
  color: var(--color-primary-lighter);
  font-size: 1.85rem;
  font-weight: 400;

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.7rem;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    padding: 0.5rem;
  }
`;

const TopSection = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Slogan>Welcome to HDMovie</Slogan>
        <Discription>
          Watch the largest collection of Movies and TV shows anytime anywhere!
        </Discription>
        <Marginer direction="vertical" margin="5rem" />
        <Link to="/pricing-plan">
          <Button title="Start Your Free Plan" color="#e20c0c" solid />
        </Link>
      </InnerWrapper>
    </Wrapper>
  );
};

export default TopSection;
