import React from 'react';
import styled from 'styled-components';
import {
  AiOutlineStar,
  AiOutlineCalendar,
  AiOutlineHeart,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { CgPoll } from 'react-icons/cg';
import { BsRecordCircle } from 'react-icons/bs';

function renderIcon(title) {
  switch (title) {
    case 'Popular':
      return <AiOutlineStar size={20} />;
    case 'Top Rated':
      return <CgPoll size={20} />;
    case 'Upcoming':
      return <AiOutlineCalendar size={20} />;
    case 'My Favorite':
      return <AiOutlineHeart size={20} />;
    case 'Watch Later':
      return <AiOutlineClockCircle size={20} />;
    default:
      return <BsRecordCircle size={15} />;
  }
}

const MenuItem = ({ title }) => {
  return (
    <>
      <div style={{ marginRight: '10px' }}>{renderIcon(title)}</div>
      {title}
    </>
  );
};

export default MenuItem;
