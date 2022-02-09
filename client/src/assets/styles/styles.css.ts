import {
  globalStyle,
  createTheme,
  createThemeContract,
} from "@vanilla-extract/css";

globalStyle("html, body", {
  width: "100%",
  height: "100%",
});

globalStyle("*", {
  margin: 0,
  padding: 0,
});
