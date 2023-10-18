import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import OurService from '../components/Home/OurService';
import TopSection from '../components/Home/TopSection';
import Footer from '../components/Home/Footer';

import A from '../svg/macbook-ipad-pro-iphone-x-apple-news-app-hero.jpg';
import B from '../svg/Apple-News-cover.jpg';
import C from '../svg/og_overview.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  overflow-x: hidden;
`;

const Welcome = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>{`Welcome to HDMovie`}</title>
      </Helmet>
      <TopSection />
      <OurService
        img={A}
        header="Watch on any device"
        description="Dolor sit amet, consectetur adipisicing elit. Nostrum
        ullam vel nesciunt expedita, temporibus aliquam ipsam iste eligendi?
        Aspernatur dolorum asperiores assumenda in cupiditate blanditiis
        repudiandae, placeat tenetur rerum enim. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Laudantium praesentium, quidem nulla vel
        aspernatur quod quam culpa deserunt quisquam modi dolorum magni enim
        ipsum vero repellendus ea at iste quis!"
        buttonText="Learn More"
        link="/"
        solid
      />
      <OurService
        img={B}
        header="Make your own playlist"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
        ullam vel nesciunt expedita, consectetur adipisicing elit. Laudantium praesentium, quidem nulla vel
        aspernatur quod quam culpa deserunt quisquam modi dolorum magni enim
        ipsum vero repellendus ea at iste quis!"
        buttonText="Start Watching"
        link="/discover/popular"
        invert
      />
      <OurService
        img={C}
        header="Watch on ultra HD"
        description="Temporibus aliquam ipsam iste eligendi?
        Aspernatur dolorum asperiores assumenda in cupiditate blanditiis
        repudiandae, placeat tenetur rerum enim. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Laudantium praesentium, quidem nulla vel
        aspernatur quod quam culpa deserunt quisquam modi dolorum magni enim
        ipsum vero repellendus ea at iste quis!"
        buttonText="Start Your Free Plan"
        link="/pricing-plan"
        solid
      />
      <Footer />
    </Wrapper>
  );
};

export default Welcome;
