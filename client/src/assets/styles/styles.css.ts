import { createGlobalTheme } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";
import { colors } from "src/assets/styles/colors.css";
import { typography } from "./typography.css";

const root = createGlobalTheme("--root", {
  ...typography,
});

globalStyle("html, body, #__next", {
  width: "100%",
  height: "100%",
  fontFamily: "Arial, Helvetica, sans-serif",
});

globalStyle("*", {
  margin: 0,
  padding: 0,
});

export const theme = { ...root, colors };
