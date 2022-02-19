import HttpException from 'src/api/common/exceptions/HttpException'
import { UpdatePostRequestDto } from './dto/updatePost.request.dto'
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

  /** 게시글 ID로 조회 */
  async getOnePost(id: string) {
    try {
      const post = await postModel.findById(id)

      return post
    } catch (error) {
      console.error(error)
    }
  }

  /** 게시글 생성 */
  async createPost(post: Post) {
    try {
      return await postModel.create(post)
    } catch (error) {
      console.error(error)
    }
  }

  /** 게시글 전체 업데이트 */
  async updatePost(dto: UpdatePostRequestDto) {
    const { _id, post } = dto
    try {
      return await postModel.findByIdAndUpdate(_id, post, {
        new: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  /** 타이틀 수정 */
  async updateTitle(id: string, title: string) {
    try {
      const post = await postModel.findById(id)

      if (!post) throw new Error('no Post')
      post.title = title

      await post.save()

      return post
    } catch (error) {
      console.error(error)
    }
  }

  async deletePost(id: string) {
    try {
      await postModel.deleteOne({ id })
      return true
    } catch (error) {
      console.error(error)
    }
  }
}

export default PostsRepository
