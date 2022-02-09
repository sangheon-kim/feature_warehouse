import { createTheme, createThemeContract } from "@vanilla-extract/css";

const colors = createThemeContract({
  primary: null,
  privary_variant: null,
  secondary: null,
  secondary_variant: null,
  bg100: null,
  button100: null,
  wireframe: {
    gray700: null,
    gray600: null,
    gray500: null,
    gray400: null,
    gray300: null,
    gray200: null,
    gray100: null,
  },
});

export const lightTheme = createTheme(colors, {
  primary: "#6200EE",
  privary_variant: "#3700B3",
  secondary: "#03DAC6",
  secondary_variant: "#018786",
  bg100: "#2A2A2A",
  button100: "#FEFEFE",
  wireframe: {
    gray700: "#424E5F",
    gray600: "#949FAC",
    gray500: "#BBC3CD",
    gray400: "#E9EDF2",
    gray300: "#EFF2F4",
    gray200: "#FBFBFB",
    gray100: "#FFFFFF",
  },
});

export const darkTheme = createTheme(colors, {
  primary: "#6200EE",
  privary_variant: "#3700B3",
  secondary: "#03DAC6",
  secondary_variant: "#018786",
  bg100: "#2A2A2A",
  button100: "#FEFEFE",
  wireframe: {
    gray700: "#424E5F",
    gray600: "#949FAC",
    gray500: "#BBC3CD",
    gray400: "#E9EDF2",
    gray300: "#EFF2F4",
    gray200: "#FBFBFB",
    gray100: "#FFFFFF",
  },
});
