// Redux
import { useSelector } from 'react-redux';

// Components
import Logo from '../components/Logo';
import MenuItem from '../components/MenuItem';

const Sidebar = () => {
  const { staticCategories } = useSelector((state) => state.config);

  return (
    <div className="gap-8 hidden lg:flex flex-col p-4 xl:p-8 mt-16 border-r">
      <Logo />
      <header className="text-xl tracking-tighter uppercase font-bold">
        Discover
      </header>
      <div className="flex flex-col gap-4">{renderStatic()}</div>
    </div>
  );

  function renderStatic() {
    return staticCategories.map((category, i) => (
      <MenuItem key={i} title={category} url={`/${category}`} />
    ));
  }
};

export default Sidebar;
