// hooks
import { useGenres } from '../hooks/useGenre';

// Redux
import { useSelector } from 'react-redux';

// Components
import Logo from '../components/Logo';
import Loading from '../components/Loading';
import MenuItem from '../components/MenuItem';

const Sidebar = () => {
  const { staticCategories } = useSelector((state) => state.config);
  const { isLoading, data: genres } = useGenres();

  return (
    <div className="gap-8 hidden lg:flex flex-col p-4 xl:p-8 mt-16 border-r">
      <Logo />
      <header className="text-xl tracking-tighter uppercase font-bold">
        Discover
      </header>
      <div className="flex flex-col gap-4">{renderStatic()}</div>
      <header className="text-xl tracking-tighter uppercase font-bold">
        Genres
      </header>
      {isLoading ? (
        <Loading className="flex justify-center" />
      ) : (
        <div className="flex flex-col gap-4">{renderGenres()}</div>
      )}
    </div>
  );

  function renderStatic() {
    return staticCategories?.map((category, i) => (
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

export default Sidebar;
