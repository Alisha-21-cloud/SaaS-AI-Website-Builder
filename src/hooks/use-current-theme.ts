import { useTheme } from "next-themes";

export function useCurrentTheme() {
    const {theme, systemTheme} = useTheme();

    if (theme === "dark" || theme === "light") {
        return theme;
    }

    return systemTheme;
}