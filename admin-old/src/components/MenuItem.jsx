import { NavLink } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineUnorderedList,
  AiOutlineUser,
} from 'react-icons/ai';
import { BiCameraMovie } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { IoCreateOutline } from 'react-icons/io5';
import { CgPoll } from 'react-icons/cg';
import { cn } from '../lib';

function renderIcon(title) {
  switch (title) {
    case 'dashboard':
      return <AiOutlineDashboard size={20} />;
    case 'movies':
      return <BiCameraMovie size={20} />;
    case 'casts':
      return <BsPeople size={20} />;
    case 'genres':
      return <AiOutlineUnorderedList size={20} />;
    case 'users':
      return <AiOutlineUser size={20} />;
    case 'account':
      return <IoCreateOutline size={20} />;
    default:
      return <CgPoll size={20} />;
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
