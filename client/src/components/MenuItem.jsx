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
    case 'popular':
      return <AiOutlineStar size={20} />;
    case 'top rated':
      return <CgPoll size={20} />;
    case 'upcoming':
      return <AiOutlineCalendar size={20} />;
    case 'my favorite':
      return <AiOutlineHeart size={20} />;
    case 'watch later':
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
      <p className="capitalize">{title}</p>
    </NavLink>
  );
};

export default MenuItem;
