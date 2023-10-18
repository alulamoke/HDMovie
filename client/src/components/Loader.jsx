import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: var(--color-primary-dark);
  box-shadow: -5rem 0rem 0rem var(--color-primary);
  border-radius: 50%;
  -webkit-animation: circle_classic 1s ease-in-out infinite alternate;
  -moz-animation: circle_classic 1s ease-in-out infinite alternate;
  animation: circle_classic 1s ease-in-out infinite alternate;

  @-webkit-keyframes circle_classic {
    0% {
      opacity: 0.1;
      -webkit-transform: rotate(0deg) scale(0.5);
    }
    100% {
      opacity: 1;
      -webkit-transform: rotate(360deg) scale(1.2);
    }
  }
  @-moz-keyframes circle_classic {
    0% {
      opacity: 0.1;
      -moz-transform: rotate(0deg) scale(0.5);
    }
    100% {
      opacity: 1;
      -moz-transform: rotate(360deg) scale(1.2);
    }
  }
  @keyframes circle_classic {
    0% {
      opacity: 0.1;
      transform: rotate(0deg) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: rotate(360deg) scale(1.2);
    }
  }
  @media ${(props) => props.theme.mediaQueries.smaller} {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <Loading />
    </LoaderWrapper>
  );
};

export default Loader;
