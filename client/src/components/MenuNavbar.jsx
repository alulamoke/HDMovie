import { useState } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

// Redux
import { useSelector } from 'react-redux';

// Components
import Logo from './Logo';
import MenuItem from './MenuItem';
import SearchBar from './SearchBar';

const MenuNavbar = () => {
  const { staticCategories, data: genres } = useSelector(
    (state) => state.config
  );
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
          <Link to="/user">
            <FaUserCircle className="w-14 h-14 shrink-0" />
          </Link>
        </div>
      </nav>
      <Menu isOpen={isOpened} onStateChange={isMenuOpen}>
        <div className="mt-24 space-y-6 p-8">
          <Logo />
          <header className="text-xl tracking-tighter uppercase font-bold">
            Discover
          </header>
          <div className="flex flex-col gap-4">{renderStatic()}</div>
          <header className="text-xl tracking-tighter uppercase font-bold">
            Genres
          </header>
          <div className="flex flex-col gap-4">{renderGenres()}</div>
        </div>
      </Menu>
    </>
  );

  function renderStatic() {
    return staticCategories.map((category, i) => (
      <MenuItem key={i} title={category} url={`/discover/${category}`} />
    ));
  }

  function renderGenres() {
    return genres?.map((genre) => (
      <MenuItem
        key={genre._id}
        title={genre.name}
        url={`/genre/${genre.name}`}
      />
    ));
  }
};

export default MenuNavbar;
