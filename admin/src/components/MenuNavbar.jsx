import { useState } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

// Redux
import { useSelector } from 'react-redux';

// Components
import MenuItem from './MenuItem';
import SearchBar from './Movie/SearchBar';

import * as ROUTES from '../constant/routes';

const MenuNavbar = () => {
  const { staticCategories } = useSelector((state) => state.config);
  const [isOpened, setisOpened] = useState(false);

  const isMenuOpen = ({ isOpened }) => {
    setisOpened(isOpened);
  };

  return (
    <>
      <nav className="flex w-full border-b items-center lg:hidden justify-between gap-4 bg-white shadow-md py-6 px-8 z-10">
        <AiOutlineMenu
          className="w-14 h-14 shrink-0 cursor-pointer"
          onClick={() => setisOpened(true)}
        />
        <div className="flex items-center gap-4">
          <SearchBar />
          <Link to={ROUTES.ACCOUNT}>
            <FaUserCircle className="w-14 h-14 shrink-0" />
          </Link>
        </div>
      </nav>
      <Menu isOpen={isOpened} onStateChange={isMenuOpen}>
        <header className="text-xl tracking-tighter uppercase font-bold">
          Discover
        </header>
        <div className="flex flex-col gap-4">{renderStatic()}</div>
      </Menu>
    </>
  );

  function renderStatic() {
    return staticCategories.map((category, i) => (
      <MenuItem key={i} title={category} url={`/${category}`} />
    ));
  }
};

export default MenuNavbar;
