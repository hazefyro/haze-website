export const initThemeScript = `
  (() => {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      const theme =
          savedTheme === "dark" || savedTheme === "light"
              ? savedTheme
              : systemPrefersDark
                ? "dark"
                : "light";

      const root = document.documentElement;
      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
  })();
  `;
