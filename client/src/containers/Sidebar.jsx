// Redux
import { useSelector } from 'react-redux';

// Components
import Logo from '../components/Logo';
import MenuItem from '../components/MenuItem';

const Sidebar = () => {
  const { staticCategories, genres } = useSelector((state) => state.config);

  return (
    <div className="fixed top-0 left-0 gap-8 hidden md:flex flex-col p-4 xl:p-8 mt-16 border-r">
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
  );

  function renderStatic() {
    return staticCategories.map((category, i) => (
      <MenuItem key={i} title={category} url={`/discover/${category}`} />
    ));
  }

  function renderGenres() {
    return genres.map((genre) => (
      <MenuItem
        key={genre._id}
        title={genre.name}
        url={`/genre/${genre.name}`}
      />
    ));
  }
};

export default Sidebar;
