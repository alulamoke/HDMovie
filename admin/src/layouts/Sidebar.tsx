import { NavLink } from "react-router-dom";

import { Logo } from "@/components/Logo";

import { SIDEBAR_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  return (
    <aside className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo />
        </div>
        <div className="flex-1">
          <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
            {SIDEBAR_ITEMS.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex select-none items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                    isActive ? "bg-muted text-primary" : "",
                  )
                }
              >
                <item.icon className="size-4" />
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};
