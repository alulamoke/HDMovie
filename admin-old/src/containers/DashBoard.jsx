import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';

// Components
import Header from '../components/Header';
import BestSeriesChart from '../components/Stastics/BestSeriesChart';
import BestMoviesChart from '../components/Stastics/BestMoviesChart';

// Discover Component
const DashBoard = () => {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Stastics Dashboard</title>
      </Helmet>
      <div className="flex flex-col gap-8 py-24 px-16">
        <Header title="dashboard" size="2" />
        <div className="flex flex-col gap-16">
          <BestMoviesChart />
          <BestSeriesChart />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
