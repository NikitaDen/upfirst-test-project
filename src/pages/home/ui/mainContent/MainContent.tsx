import { memo, useCallback, useEffect, useState } from 'react'
import { Card } from '@/entities/card/ui'
import { Post } from '@/entities/card/model'
import { loadPosts } from '@/pages/home/api'
import { Pagination } from '@/features/pagination/ui'
import { Spinner } from '@/shared/ui'
import classNames from 'classnames'
import { deletePost } from '@/entities/card/api'
import { throttle, useUrlState } from '@/shared/lib'
import s from './mainContent.module.scss'

const POSTS_PER_PAGE = 7
const DEFAULT_PAGINATION_SHOWED_PAGES_COUNT = 5

export const MainContent = memo(() => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useUrlState('pageIndex', 0)
  const [requestState, setRequestState] = useState<'pending' | 'error' | 'idle'>('idle')
  const [totalPostsCount, setTotalPostsCount] = useState(0)
  const [showedPagesCount, setShowedPagesCount] = useState(DEFAULT_PAGINATION_SHOWED_PAGES_COUNT)

  const isPending = requestState === 'pending'

  useEffect(() => {
    const debouncedResizeCallback = throttle((size: number) => {
      if (size < 460) {
        setShowedPagesCount(3)
      } else {
        setShowedPagesCount(DEFAULT_PAGINATION_SHOWED_PAGES_COUNT)
      }
    }, 500)

    const resizeHandler = () => {
      debouncedResizeCallback(window.innerWidth)
    }

    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  useEffect(() => {
    // Flag that allows to ignore request's returned result in case same request is triggered again
    let ignore = false

    const fetchRemotePosts = async () => {
      try {
        setRequestState('pending')

        const { posts, totalCount } = await loadPosts(currentPageIndex, POSTS_PER_PAGE)

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

  const handleDeletePost = useCallback(
    async (id: Post['id']) => {
      try {
        setRequestState('pending')

        await deletePost(id)

        setPosts(posts.filter((post) => post.id !== id))
        setRequestState('idle')
      } catch (e) {
        setRequestState('error')
        console.log('Could not remove post:', e)
      }
    },
    [posts]
  )

  return (
    <main className={s.mainContent}>
      <ul className={classNames(s.postsList, { [s.disabled]: isPending && posts.length })}>
        {isPending && !posts.length ? (
          <Spinner className={s.homeSpinner} />
        ) : (
          posts.map((post) => (
            <li
              className={s.listLi}
              key={post.id}
            >
              <Card
                key={post.id}
                onDelete={handleDeletePost}
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
          showedPagesCount={showedPagesCount}
          totalPages={Math.ceil(totalPostsCount / POSTS_PER_PAGE)}
          onPageIndexChange={handlePageChange}
        />
      )}
    </main>
  )
})
