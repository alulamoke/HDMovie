import { Link } from "react-router-dom";

import LogoIMG from "@/assets/logo.png";

export const Logo = () => {
  return (
    <Link to="/" className="flex select-none items-center gap-2">
      <img
        src={LogoIMG}
        className="size-6 shrink-0 rounded-md object-contain"
      />
      <span className="text-sm font-bold">HDMovie</span>
    </Link>
  );
};
