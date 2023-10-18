import React, { useState, useRef, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

// Components
import Loading from '../../Loading';
import CastItem from './CastItem';

const Wrapper = styled.div`
  margin-bottom: 3rem;
`;

const ArrowLeftIcon = styled(AiOutlineArrowLeft)`
  left: -15px;
  position: absolute;
  top: 50%;
  display: block;
  width: 12px;
  height: 12px;
  padding: 0;
  transform: translate(0, -50%);
  cursor: pointer;
`;

const ArrowRightIcon = styled(AiOutlineArrowRight)`
  right: -15px;
  position: absolute;
  top: 50%;
  display: block;
  width: 12px;
  height: 12px;
  padding: 0;
  transform: translate(0, -50%);
  cursor: pointer;
`;

const Cast = ({ base_url, casts }) => {
  const [totalShow, setTotalShow] = useState(null);
  const sliderElement = useRef();

  // Set amount of items to show on slider based on the width of the element
  const changeTotalShow = useCallback(() => {
    let totalItems = Math.round(sliderElement.current.offsetWidth / 70);
    if (totalItems > casts.length) {
      totalItems = casts.length;
    }
    setTotalShow(totalItems);
  }, [casts.length]);

  const items = casts.map((el) => (
    <CastItem key={el._id} base_url={base_url} person={el} />
  ));

  useEffect(() => {
    changeTotalShow();
    window.addEventListener('resize', changeTotalShow);
    return () => window.removeEventListener('resize', changeTotalShow);
  }, [changeTotalShow]);

  if (!casts) {
    return <Loading />;
  }

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: totalShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Wrapper ref={sliderElement}>
      <Slider {...settings}>{items}</Slider>
    </Wrapper>
  );
};

function NextArrow({ onClick }) {
  return <ArrowRightIcon onClick={onClick} />;
}

function PrevArrow({ onClick }) {
  return <ArrowLeftIcon onClick={onClick} />;
}

export default Cast;
