import { theme } from "src/assets/styles/styles.css";
import { style } from "@vanilla-extract/css";

export const Wrapper = style({
  width: "100%",
  height: "100%",
  backgroundColor: theme.colors.bg100,
  color: theme.colors.txtColor,
  ...theme.typography.ko.headline.headline1,
});
