import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Components
import Button from '../components/Button';
import BackGroundImg from '../svg/bg2.jpg';

const Wrapper = styled.div`
    position: relative;
    width:100%
    height: 100vh;
    background: url(${BackGroundImg}) no-repeat center center/cover;
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

const DarkOverLay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
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

const ButtonContainer = styled.div`
  width: 30rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
`;

const Home = () => {
  return (
    <Wrapper>
      <DarkOverLay>
        <InnerWrapper>
          <Slogan>Welcome to HDMovie</Slogan>
          <Discription>
            A HDMovie where you can check all your favorite movies, as well as
            the cast of it, and so much more!
          </Discription>
          <ButtonContainer>
            <Link to="/login">
              <Button title="SignIn" color="#e20c0c" solid />
            </Link>
            <Link to="/signup">
              <Button title="SignUp" color="#e20c0c" solid />
            </Link>
          </ButtonContainer>
        </InnerWrapper>
      </DarkOverLay>
    </Wrapper>
  );
};

export default Home;
