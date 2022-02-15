import dotenv from "dotenv"
import path from "path"
import os from "os"

dotenv.config({
  path:
    process.env.NODE_ENV === "development"
      ? path.join(__dirname, "../envs/.env.dev")
      : path.join(__dirname, "../envs/.env"),
})
