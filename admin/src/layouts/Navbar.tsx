import { Link, NavLink, useNavigate } from "react-router-dom";
import { CircleUser, Menu, Bell, LogOutIcon, SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SIDEBAR_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
import localStore from "@/utils/localStore";
import { logout } from "@/redux/features/authSlice";

export const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-8 shrink-0 md:hidden"
          >
            <Menu className="size-4" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="mt-4 grid gap-2 text-sm font-medium">
            <Logo />
            <hr />
            {SIDEBAR_ITEMS.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "mx-[-0.65rem] flex select-none items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    isActive ? "bg-muted text-foreground" : "",
                  )
                }
              >
                <item.icon className="size-4" />
                {item.title}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="size-8">
          <Bell className="size-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="size-8 rounded-full"
            >
              <CircleUser className="size-4" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to="/settings"
                className="flex items-center gap-2 font-medium"
              >
                <SettingsIcon className="size-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button
                aria-label="logout-toggle"
                onClick={() => {
                  toast.success("Logout Successful.");
                  localStore.deauthenticateUser();
                  queryClient.invalidateQueries({ queryKey: ["authUser"] });
                  dispatch(logout());
                  navigate("/login");
                }}
                className="flex w-full items-center gap-2 font-medium text-destructive"
              >
                <LogOutIcon className="size-4" />
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
