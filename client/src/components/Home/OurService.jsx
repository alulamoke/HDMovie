import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../Button';

const Wrapper = styled.div`
  width: 100%;
  max-width: 150em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  margin: 10rem 0;

  @media ${(props) => props.theme.mediaQueries.medium} {
    flex-direction: column;
    justify-content: center;
    margin: 3rem 0;
  }
`;

const ImageWrapper = styled.div`
  order: ${(props) => props.invert && '2'};
  width: auto;
  height: 35rem;

  img {
    width: auto;
    height: 100%;
  }

  @media ${(props) => props.theme.mediaQueries.larger} {
    height: 35rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    height: 28rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    order: ${(props) => props.invert && '0'}

    height: 25rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    height: 20rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10rem;
  margin-right: ${(props) => props.invert && '10rem'};

  @media ${(props) => props.theme.mediaQueries.medium} {
    margin: 0;
    width: 80%;
    margin-top: 3rem;
    align-items: center;
    text-align: center;
  }
`;

const Header = styled.h1`
  color: var(--color-primary-main);
  font-size: 2.5rem;
  font-weight: bold;
`;

const Discription = styled.p`
  color: var(--color-primary-dark);
  font-size: 1.5rem;
  font-weight: 500;
  margin: 3rem 0;

  @media ${(props) => props.theme.mediaQueries.small} {
    margin-top: 1rem;
  }
`;

const OurService = ({
  img,
  header,
  description,
  buttonText,
  link,
  invert,
  solid,
}) => {
  return (
    <Wrapper>
      <ImageWrapper invert={invert ? 1 : 0}>
        <img src={img} alt={header} />
      </ImageWrapper>
      <InfoWrapper invert={invert ? 1 : 0}>
        <Header>{header}</Header>
        <Discription>{description}</Discription>
        <Link to={link}>
          <Button title={buttonText} color="#e20c0c" solid={solid} />
        </Link>
      </InfoWrapper>
    </Wrapper>
  );
};

OurService.propTypes = {
  img: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  invert: PropTypes.bool,
  solid: PropTypes.bool,
};

export default OurService;
