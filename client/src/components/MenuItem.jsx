import { NavLink } from 'react-router-dom';
import {
  AiOutlineStar,
  AiOutlineCalendar,
  AiOutlineHeart,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { CgPoll } from 'react-icons/cg';
import { BsRecordCircle } from 'react-icons/bs';
import { cn } from '../lib';

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

const MenuItem = ({ title, url }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'flex items-center gap-4 py-4 px-8 text-xl  opacity-100 rounded-full border-gray-700',
          isActive
            ? 'border text-black font-bold'
            : 'hover:border text-secondary font-semibold'
        )
      }
      to={url}
    >
      {renderIcon(title)}
      <p>{title}</p>
    </NavLink>
  );
};

export default MenuItem;
