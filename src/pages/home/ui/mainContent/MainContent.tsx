import { memo, useEffect, useState } from 'react'
import { Card } from '@/entities/card/ui'
import { Post } from '@/entities/card/model'
import { loadPosts } from '@/pages/home/api'
import { Pagination } from '@/features/pagination/ui'
import { Spinner } from '@/shared/ui'
import classNames from 'classnames'
import s from './mainContent.module.scss'

const POSTS_PER_PAGE = 7

// TODO page index state in URL
export const MainContent = memo(() => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [requestState, setRequestState] = useState<'pending' | 'error' | 'idle'>('idle')
  const [totalPostsCount, setTotalPostsCount] = useState(0)

  const isPending = requestState === 'pending'

  useEffect(() => {
    // Flag that allows to ignore request's returned result in case same request is triggered again
    let ignore = false

    const fetchRemotePosts = async () => {
      try {
        setRequestState('pending')

        const { posts, totalCount } = await loadPosts(0, POSTS_PER_PAGE)

        if (!ignore) {
          setPosts(posts)
          setTotalPostsCount(totalCount)
          setRequestState('idle')
        }
      } catch (e) {
        if (!ignore) {
          setRequestState('error')
          console.log('Could not load posts from the server: ', e)
        }
      }
    }

    fetchRemotePosts()

    return () => {
      ignore = true
    }
  }, [])

  const handlePageChange = async (index: number) => {
    try {
      setCurrentPageIndex(index)
      setRequestState('pending')

      const { posts, totalCount } = await loadPosts(index, POSTS_PER_PAGE)

      setPosts(posts)
      setTotalPostsCount(totalCount)
      setRequestState('idle')
    } catch (e) {
      setRequestState('error')

      // Return pagination state to the page index request was sent from
      setCurrentPageIndex(currentPageIndex)

      console.log('Could not load posts from the server: ', e)
    }
  }

  return (
    <main className={s.mainContent}>
      <ul className={classNames(s.postsList, { [s.disabled]: isPending && posts.length })}>
        {isPending && !posts.length ? (
          <Spinner className={s.homeSpinner} />
        ) : (
          posts.map((post) => (
            <li key={post.id}>
              <Card
                key={post.id}
                {...post}
              />
            </li>
          ))
        )}
      </ul>

      {totalPostsCount > 0 && (
        <Pagination
          disabled={isPending}
          currentPageIndex={currentPageIndex}
          totalPages={Math.ceil(totalPostsCount / POSTS_PER_PAGE)}
          onPageIndexChange={handlePageChange}
        />
      )}
    </main>
  )
})
