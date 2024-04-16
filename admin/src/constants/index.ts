import {
  LineChart,
  Settings,
  Layers3,
  FilmIcon,
  Users2Icon,
  UsersIcon,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    url: "/",
    icon: LineChart,
  },
  {
    title: "Genres",
    url: "/genres",
    icon: Layers3,
  },
  {
    title: "Casts",
    url: "/casts",
    icon: UsersIcon,
  },
  {
    title: "Movies",
    url: "/movies",
    icon: FilmIcon,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users2Icon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
