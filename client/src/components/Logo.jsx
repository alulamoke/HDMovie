import { Link } from 'react-router-dom';
import LogoSvg from '../svg/logo.svg';

const Logo = () => {
  return (
    <Link to="/" className="w-full h-[18rem] flex justify-center">
      <img src={LogoSvg} className="max-w-[60%] md:max-w-[75%]" />
    </Link>
  );
};

export default Logo;
