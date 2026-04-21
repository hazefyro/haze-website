import { useEffect, useState } from "react";
import { Button } from "@base-ui/react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

const MotionButton = motion.create(Button);

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
                <motion.div
                    className="bg-foreground/10 h-6 w-6 rounded-4xl"
                    animate={{ opacity: [0.35, 0.7, 0.35] }}
                    transition={{
                        duration: 1.6,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 0.15,
                    }}
                />
            </Button>
        );
    }

    return (
        <MotionButton
            onClick={handleToggleClick}
            aria-label="Toggle theme"
            className="cursor-pointer"
            whileTap={{
                scale: 0.9,
            }}
            whileHover={{ scale: 1.1 }}
        >
            {theme === "light" ? <Sun /> : <Moon />}
        </MotionButton>
    );
};
