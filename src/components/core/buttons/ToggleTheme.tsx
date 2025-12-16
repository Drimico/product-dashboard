import { useThemeStore } from "@/stores/useThemeStore";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonStyles = tv({
  slots: {
    base: "relative flex items-center h-15 font-raleway",
    text: "whitespace-nowrap",
  },
  variants: {
    type: {
      auth: {
        base: "border-2 w-15 transition-all duration-300 hover:scale-110 shadow-m group rounded-full justify-center",
        text: "hidden w-0 opacity-0",
      },
      profile: {
        base: "gap-2 w-full cursor-pointer hover:bg-(--bg-light) px-2",
        text: "flex",
      },
    },
  },
});
type ButtonVariants = VariantProps<typeof buttonStyles>;

const ToggleTheme = ({ type }: ButtonVariants) => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;

    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const { base, text } = buttonStyles({ type });
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={base()}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative flex items-center justify-center w-7.5 h-7.5">
        <Sun
          size={30}
          className={`absolute text-primary transition-all duration-300 ${
            theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
          }`}
        />

        <Moon
          size={30}
          className={`absolute text-primary transition-all duration-300 ${
            theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
          }`}
        />
      </div>

      <span className="absolute top-full mt-2 px-3 py-1 bg-bg-light border border-border rounded-lg text-sm text-text opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {theme === "light" ? "Dark mode" : "Light mode"}
      </span>
      <span className={text()}>{theme === "light" ? "Dark mode" : "Light mode"}</span>
    </button>
  );
};

export default ToggleTheme;
