import { createContext } from "react";

// add new nav bar with light/dark toggle
export const themes = {
  light: {
    bgPrimary: "rgb(250, 250, 250)",
    bgSecondary: "#a5c1e6",
    bgListJob: "rgb(250, 250, 250)",
    bgListJobBorderHover: "gold",
    bgListJobBrightnessHover: "brightness(100%)",
    textPrimary: "rgb(50, 50, 50)",
    textSecondary: "#eaeaea",
    calendar: "#a5c1e6",
    calendarBorder: "rgb(100, 100, 100)",
    sidebar: "pink",
    logo: "#df7fb9",
    borderPrimary: "rgb(120, 120, 120)"
  },
  dark: {
    bgPrimary: "#223855",
    bgSecondary: "#222934",
    bgListJob: "#223855",
    bgListJobBorderHover: "rgb(180, 150, 0)",
    bgListJobBrightnessHover: "brightness(120%)",
    textPrimary: "#eaeaea",
    textSecondary: "rgb(50, 50, 50)",
    calendar: "#222934",
    calendarBorder: "#a9a9a95e",
    sidebar: "#df7fb9",
    logo: "#df7fb9",
    borderPrimary: "#a9a9a9"
  },
};

export const ThemeContext = createContext(
  themes.dark // default value
);