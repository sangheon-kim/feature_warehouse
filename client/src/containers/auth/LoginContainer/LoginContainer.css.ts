import { style, globalStyle, fontFace, keyframes } from "@vanilla-extract/css"

const animate = keyframes({
  "0%, 100%": { transform: "translateY(-40px)" },
  "50%": { transform: "translateY(40px)" },
})

globalStyle("html, body", {
  overflow: "hidden",
  width: "100vw",
  minHeight: "100vh",
})
globalStyle("*", {
  boxSizing: "border-box",
})

export const Wrapper = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  fontFamily: `Poppins`,
  background: "#cccccc",
  // background: "linear-gradient(to bottom, #f1f4f9, #dff1ff)",
})

export const Color = style({
  position: "absolute",
  filter: "blur(150px)",

  selectors: {
    "&:nth-child(1)": {
      top: -350,
      width: 600,
      height: 600,
      background: "#ff359b",
    },
    "&:nth-child(2)": {
      bottom: -150,
      left: 100,
      width: 600,
      height: 600,
      background: "#fffd87",
    },
    "&:nth-child(3)": {
      bottom: 50,
      right: 100,
      width: 500,
      height: 500,
      background: "#00d2ff",
    },
  },
})

export const Box = style({
  position: "relative",
})

export const Square = style({
  position: "absolute",
  backdropFilter: "blur(5px)", // 핵심
  boxShadow: "0 25px 45px rgba(0,0,0,0.1)", // 핵심
  border: "1px solid rgba(255,255,255,0.5)",
  borderRight: "1px solid rgba(255,255,255,0.2)",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.1)",
  borderRadius: 10,
  animation: `${animate} 10s linear infinite`,
  animationDelay: "calc(-1s * var(--i))",
  selectors: {
    "&:nth-child(1)": {
      top: -50,
      right: -60,
      width: 100,
      height: 100,
    },
    "&:nth-child(2)": {
      top: 150,
      left: -100,
      width: 120,
      height: 120,
      zIndex: 2,
    },
    "&:nth-child(3)": {
      bottom: 50,
      right: -60,
      width: 80,
      height: 80,
      zIndex: 2,
    },
    "&:nth-child(4)": {
      bottom: -80,
      left: 100,
      width: 50,
      height: 50,
    },
    "&:nth-child(5)": {
      top: -80,
      left: 140,
      width: 60,
      height: 60,
    },
  },
})

export const Container = style({
  position: "relative",
  width: 400,
  minHeight: 400,
  background: "rgba(255,255,255,0.1)",
  borderRadius: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(5px)", // 핵심
  boxShadow: "0 25px 45px rgba(0,0,0,0.1)", // 핵심
  border: "1px solid rgba(255,255,255,0.5)",
  borderRight: "1px solid rgba(255,255,255,0.2)",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
})

export const Form = style({
  position: "relative",
  width: "100%",
  height: "100%",
  padding: 40,
})

export const Title = style({
  position: "relative",
  color: "#ffffff",
  fontSize: 24,
  fontWeight: 700,
  letterSpacing: 1,
  marginBottom: 40,
  selectors: {
    "&:before": {
      content: "",
      position: "absolute",
      left: 0,
      bottom: -10,
      width: 72,
      height: 4,
      background: "#ffffff",
    },
  },
})

export const InputBox = style({
  width: "100%",
  marginTop: 20,
})

export const Input = style({
  width: "100%",
  background: "rgba(255,255,255,0.2)",
  padding: "10px 20px",
  borderRadius: 35,
  fontSize: 16,
  letterSpacing: 1,
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.5)",
  borderRight: "1px solid rgba(255,255,255,0.2)",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  selectors: {
    "&::placeholder": {
      color: "#ffffff",
    },
    '&[type="submit"]': {
      background: "#ffffff",
      color: "#666666",
      maxWidth: 100,
      cursor: "pointer",
      marginBottom: 20,
      fontWeight: 700,
    },
  },
})

export const Forget = style({
  marginTop: 5,
  color: "#ffffff",
})

globalStyle(`${Forget} > a`, {
  color: "#ffffff",
  fontWeight: 700,
  marginLeft: 8,
})

globalStyle("input", {
  outline: "none",
})
