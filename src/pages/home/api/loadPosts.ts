import { API } from '@/shared/api'
import { Post } from '@/entities/card/model'

const isValidPostsLists = (posts): posts is Post[] => {
  return Array.isArray(posts) && (!posts.length || 'id' in posts[0])
}

export async function loadPosts(
  page = 0,
  limit = 10
): Promise<{ posts: Post[]; totalCount: number }> {
  const response = await API.get(`/posts?_page=${page}&_limit=${limit}`)

  const posts = response.data

  if (!isValidPostsLists(posts)) {
    return { posts: [], totalCount: 0 }
  }

  // Set createdAt date for having date displayed in UI
  const normalizedPosts: Post[] = posts.map((post) => ({
    ...post,
    createdAt: new Date().toISOString(),
    status: Math.random() > 0.5 ? 'success' : 'warning',
  }))

  const headers = response.headers

  let totalCount = 0

  if ('get' in headers) {
    totalCount = Number(headers.get('x-total-count'))
  }

  if (isNaN(totalCount)) {
    totalCount = 0
  }

  return { posts: normalizedPosts, totalCount }
}
