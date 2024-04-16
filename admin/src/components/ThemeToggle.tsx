import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "@/providers/theme-provider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TThemeToggle = {
  children?: React.ReactNode;
};

export const ThemeToggle: React.FC<TThemeToggle> = ({ children }) => {
  const { setTheme } = useTheme();

  const themeTypes: Theme[] = ["light", "dark", "system"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="ghost"
            size="icon"
            aria-label="theme-toggle"
            className="size-8"
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeTypes.map((theme, i) => (
          <DropdownMenuCheckboxItem
            key={i}
            checked={theme === localStorage.getItem("HDMovie-ui-theme")}
            onClick={() => setTheme(theme)}
            className="capitalize"
          >
            {theme}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
