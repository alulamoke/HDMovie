import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import SearchBar from './SearchBar';

const InnerNavBar = () => (
  <div className="hidden lg:flex items-center gap-4 absolute top-12 right-12">
    <SearchBar />
    <Link to="/user">
      <FaUserCircle size={40} />
    </Link>
  </div>
);

export default InnerNavBar;
