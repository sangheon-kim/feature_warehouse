namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    PORT: number
    MONGOOSE_USERID: string
    MONGOOSE_PASSWORD: string
    MONGOOSE_DB_NAME: string
    API_VERSION: string
  }
}
