import { UpdatePostRequestDto } from 'src/model/posts/dto/updatePost.request.dto'
import Post from 'src/model/posts/post.interface'
import PostsRepository from 'src/model/posts/posts.repository'

class PostsService {
  private postsRepository = new PostsRepository()
  constructor() {}

  async getAllPosts() {
    try {
      const posts = await this.postsRepository.getAllPosts()

      return posts
    } catch (error) {
      console.error(error)
    }
  }

  async getOnePost(id: string) {
    try {
      const post = await this.postsRepository.getOnePost(id)

      return post
    } catch (error) {
      console.error(error)
    }
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

  async updatePost(dto: UpdatePostRequestDto) {
    try {
      return await this.postsRepository.updatePost(dto)
    } catch (error) {
      console.error(error)
    }
  }

  async editTitleOfPost(id: string, title: string) {
    try {
      await this.postsRepository.updateTitle(id, title)

      return true
    } catch (error) {
      console.error(error)
    }
  }

  async deletePost(id: string) {
    try {
      return await this.postsRepository.deletePost(id)
    } catch (error) {
      console.error(error)
    }
  }
}

export default new PostsService()
