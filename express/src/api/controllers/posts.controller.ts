import express from 'express'
import Post from 'src/model/posts/post.interface'
import postsService from 'src/services/posts/posts.service'
import { Controller } from 'src/types/env'

class PostsController implements Controller {
  public path = '/posts'
  public router = express.Router()

  constructor() {
    this.init()
  }

  init() {
    this.router.get(this.path, this.getAllPosts)
    this.router.get(`${this.path}/:id`, this.getOnePost)
    this.router.post(this.path, this.createPost)
    this.router.put(`${this.path}/:id`, this.updatePost)
    this.router.patch(`${this.path}/:id`, this.editTitleOfPost)
    this.router.delete(`${this.path}/:id`, this.deletePost)
  }

  private async getAllPosts(req: express.Request, res: express.Response) {
    try {
      const posts = (await postsService.getAllPosts()) || []
      res.json(posts)
    } catch (error) {
      console.error(error)
    }
  }

  private async getOnePost(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params
      const post = (await postsService.getOnePost(id)) || {}
      res.json(post)
    } catch (error) {
      console.error(error)
    }
  }

  private async createPost(req: express.Request, res: express.Response) {
    try {
      const post: Post = req.body
      const result = await postsService.createPost(post)
      res.end(`${result}`)
    } catch (error) {
      console.error(error)
    }
  }

  private async updatePost(req: express.Request, res: express.Response) {
    try {
      const { id: _id } = req.params
      const post: Post = req.body

      const result = await postsService.updatePost({ _id, post })
      res.end(`${result}`)
    } catch (error) {
      console.error(error)
    }
  }

  private async editTitleOfPost(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params

      const { title }: Post = req.body

      const result = await postsService.editTitleOfPost(id, title)
      res.end(`${result}`)
    } catch (error) {
      console.error(error)
    }
  }

  private async deletePost(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params
      const result = await postsService.deletePost(id)
      res.end(`${result}`)
    } catch (error) {
      console.error(error)
    }
  }
}

export default PostsController
