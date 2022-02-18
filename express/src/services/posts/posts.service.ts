import Post from 'src/model/posts/post.interface'
import PostsRepository from 'src/model/posts/posts.repository'

class PostsService {
  private postsRepository = new PostsRepository()
  constructor() {}

  async getAllPosts() {
    const posts = await this.postsRepository.getAllPosts()

    return posts
  }

  async createPost(body: Post) {
    try {
      await this.postsRepository.createPost(body)

      return true
    } catch (error) {
      console.error(error)

      return false
    }
  }
}

export default new PostsService()
