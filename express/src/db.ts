import mongoose from 'mongoose'

class DB {
  constructor() {}

  init() {
    this.connectMongodb()
  }

  /** mongodb 연결 */
  private connectMongodb() {
    const { MONGOOSE_DB_NAME, MONGOOSE_PASSWORD, MONGOOSE_USERID } = process.env

    mongoose.connect(
      `mongodb+srv://${MONGOOSE_USERID}:${MONGOOSE_PASSWORD}@cluster0.gqmop.mongodb.net/${MONGOOSE_DB_NAME}?retryWrites=true&w=majority`
    )
    mongoose.set('debug', process.env.NODE_ENV === 'development')
  }
}

export default DB
