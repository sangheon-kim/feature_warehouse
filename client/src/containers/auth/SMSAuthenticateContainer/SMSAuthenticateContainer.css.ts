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
  background: "#aaa",
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
  width: "calc(100% - 32px)",
  maxWidth: 750,
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
  width: "calc(100% - 32px)",
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
  margin: "0 auto",
})

export const Form = style({
  position: "relative",
  width: "100%",
  height: "100%",
  padding: "0 16px",
  display: "flex",
  flexDirection: "column",
})

export const Title = style({
  position: "relative",
  display: "inline-block",
  color: "#ffffff",
  textAlign: "center",
  fontSize: 24,
  fontWeight: 700,
  letterSpacing: 1,
  paddingBottom: 4,
  borderBottom: "2px solid #fff",
})

export const InputBox = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  marginTop: 20,
})

export const Input = style({
  width: "100%",
  background: "rgba(255,255,255,0.2)",
  padding: "8px 12px",
  borderRadius: 35,
  fontSize: 12,
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
  },
})

export const Button = style({
  background: "#ffffff",
  border: "1px solid rgba(255,255,255,0.5)",
  borderRight: "1px solid rgba(255,255,255,0.2)",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  color: "#666666",
  maxWidth: 100,
  cursor: "pointer",
  fontWeight: 700,
  borderRadius: 35,
  fontSize: 14,
  marginLeft: 8,
  minWidth: 115,
  height: 32,
})

export const SubmitButton = style({
  background: "#ffffff",
  border: "1px solid rgba(255,255,255,0.5)",
  borderRight: "1px solid rgba(255,255,255,0.2)",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  color: "#666666",
  maxWidth: 100,
  cursor: "pointer",
  fontWeight: 700,
  borderRadius: 35,
  fontSize: 14,
  minWidth: "100%",
  height: 32,
  marginTop: 32,
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
