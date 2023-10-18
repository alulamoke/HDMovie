import React from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NotfoundSvg from '../svg/empty.svg';
import Button from './Button';

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

const SubTitle = styled.h2`
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1.8rem;
`;

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

const Svg = styled.img`
  max-width: 100%;
  height: 40vh;
  margin-bottom: 6rem;
`;

const NotFound = ({ title, subtitle }) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          {title} {subtitle}
        </title>
      </Helmet>
      <TitleWrapper>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </TitleWrapper>
      <Svg src={`${NotfoundSvg}`} alt="Not found" />
      <LinkWrapper to="/">
        <Button title="Home" solid Icon={AiOutlineHome} left />
      </LinkWrapper>
    </Wrapper>
  );
};

export default NotFound;
