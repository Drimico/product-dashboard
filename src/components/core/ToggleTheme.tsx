import { useThemeStore } from "@/stores/useThemeStore";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;

    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-14 h-14 rounded-full  border-2 transition-all duration-300 hover:scale-110 hover:shadow-m group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun
        className={`absolute w-6 h-6 text-primary transition-all duration-300 ${
          theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
        }`}
      />

      <Moon
        className={`absolute w-6 h-6 text-primary transition-all duration-300 ${
          theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />

      <span className="absolute top-full mt-2 px-3 py-1 bg-bg-light border border-border rounded-lg text-sm text-text opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {theme === "light" ? "Dark mode" : "Light mode"}
      </span>
    </button>
  );
};

export default ToggleTheme;
