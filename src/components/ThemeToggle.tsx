import { useEffect, useState } from "react";
import { Button } from "@base-ui/react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "dark" : "light");
        setMounted(true);
    }, []);

    const handleToggleClick = () => {
        const nextTheme = theme === "light" ? "dark" : "light";

        setTheme(nextTheme);
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
        document.documentElement.style.colorScheme = nextTheme;
        window.localStorage.setItem("theme", nextTheme);
    };

    if (!mounted) {
        return (
            <Button aria-label="Toggle theme" className="cursor-pointer">
                <Sun className="sun" />
            </Button>
        );
    }

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
