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
    this.router.post(this.path, this.createPost)
  }

  async getAllPosts(req: express.Request, res: express.Response) {
    try {
      const posts = await postsService.getAllPosts()
      res.json(posts)
    } catch (error) {
      console.error(error)
    }
  }

  async createPost(req: express.Request, res: express.Response) {
    const post: Post = req.body
    const result = await postsService.createPost(post)
    res.end(`${result}`)

    // this.posts.push(post)
    // res.send(post)
  }
}

export default PostsController
