import { API } from '@/shared/api'
import { Post } from '@/entities/card/model'

export function deletePost(postId: Post['id']) {
  return API.delete(`/posts/${postId}`)
}
