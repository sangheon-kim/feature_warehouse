import Post from '../post.interface'

export interface UpdatePostRequestDto {
  _id: string
  post: Post
}
