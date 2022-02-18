import Post from './post.interface'
import postModel from './posts.model'

class PostsRepository {
  constructor() {}

  /** 게시글 전부 반환 */
  async getAllPosts() {
    try {
      const posts = await postModel.find()

      return posts
    } catch (error) {
      console.error(error)
    }
  }

  async createPost(post: Post) {
    try {
      return await postModel.create(post)
    } catch (error) {
      console.error(error)
    }
  }
}

export default PostsRepository
