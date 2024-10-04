import { Status } from '@/shared/model'

export type Post = {
  id: string

  title: string

  body: string

  // Formatted as ISO Date
  createdAt: string

  status: Status
}
