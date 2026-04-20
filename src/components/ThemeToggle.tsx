import { useEffect, useState } from "react";
import { Button } from "@base-ui/react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light";

    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggleClick = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <Button
            onClick={handleToggleClick}
            aria-label="Toggle theme"
            className="cursor-pointer"
        >
            {theme === "light" ? (
                <Sun className="sun" />
            ) : (
                <Moon className="moon" />
            )}
        </Button>
    );
};
