declare global {
  interface ProcessEnv {
    NODE_ENV: "development" | "production"
    PORT: number
  }
}

declare var appRoot: string
