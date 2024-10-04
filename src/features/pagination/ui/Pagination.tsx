import { memo } from 'react'
import s from './pagination.module.scss'
import classNames from 'classnames'

type PaginationProps = {
  currentPageIndex: number
  totalPages: number
  onPageIndexChange: (pageIndex: number) => void
  showedPagesCount?: number
  disabled?: boolean
}

export const Pagination = memo(
  ({
    currentPageIndex,
    totalPages,
    onPageIndexChange,
    disabled,
    showedPagesCount = 5,
  }: PaginationProps) => {
    console.log(disabled)
    const handlePageChange = (pageIndex: number) => {
      if (pageIndex >= 0 && pageIndex < totalPages) {
        onPageIndexChange(pageIndex)
      }
    }

    const calculatePageNumbers = () => {
      const pageNumbers: number[] = []

      let startPage: number
      let endPage: number

      // Logic to determine the start and end page
      if (totalPages <= showedPagesCount) {
        // If total pages are less than or equal to showedPagesCount, show all
        startPage = 0
        endPage = totalPages - 1
      } else {
        // Ensure the current page is in the middle when possible
        const halfShowedPages = Math.floor(showedPagesCount / 2)
        startPage = Math.max(0, currentPageIndex - halfShowedPages)
        endPage = Math.min(totalPages - 1, currentPageIndex + halfShowedPages)

        // Adjust start page if the end page is too close to the total pages
        if (endPage - startPage < showedPagesCount - 1) {
          if (startPage === 0) {
            endPage = Math.min(showedPagesCount - 1, totalPages - 1)
          } else if (endPage === totalPages - 1) {
            startPage = Math.max(0, totalPages - showedPagesCount)
          }
        }
      }

      // Create an array of page numbers to render (convert to 1-based for display)
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i + 1)
      }

      return pageNumbers
    }

    const pageNumbers = calculatePageNumbers()

    return (
      <nav className={classNames(s.pagination, { [s.disabled]: disabled })}>
        <button
          onClick={() => handlePageChange(currentPageIndex - 1)}
          disabled={currentPageIndex === 0}
          className={s.pageButton}
        >
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number - 1)}
            className={classNames(s.pageButton, { [s.active]: currentPageIndex + 1 === number })}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPageIndex + 1)}
          disabled={currentPageIndex === totalPages - 1}
          className={s.pageButton}
        >
          Next
        </button>
      </nav>
    )
  }
)
