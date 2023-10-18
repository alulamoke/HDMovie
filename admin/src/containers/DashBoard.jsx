import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

// Redux
import { useDispatch } from 'react-redux';
import { setSelectedMenu } from '../redux/actions/config.action';

// Components
import Header from '../components/Header';
import BestMovieChart from '../components/Stastics/BestMovieChart';
import MovieStreamingChart from '../components/Stastics/MovieStreamingChart';

const MainWrapper = styled.div`
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

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5rem;

  div:first-child {
    margin-right: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    flex-direction: column;

    div:first-child {
      margin-bottom: 10rem;
    }
  }
`;

// Discover Component
const DashBoard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname.split('/')[1];

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    dispatch(setSelectedMenu(pathName));
    return () => setSelectedMenu();
  }, [pathName, dispatch]);

  return (
    <MainWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Stastics Dashboard</title>
      </Helmet>
      <Header title="stastics" subtitle="dashboard" size="2" />
      <ChartWrapper>
        <div style={{ width: '100%' }}>
          <h1>Top 10 Movie Or Series From Each Month</h1>
          <BestMovieChart />
        </div>
        <div style={{ width: '100%' }}>
          <h1>
            No Of Watched Movie Or Series From Each Month Based On Streaming
          </h1>
          <MovieStreamingChart />
        </div>
      </ChartWrapper>
    </MainWrapper>
  );
};

export default DashBoard;
