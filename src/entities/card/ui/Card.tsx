import { memo, useState } from 'react'
import { Post } from '@/entities/card/model'
import { Button, Chip } from '@/shared/ui'
import { formatToLocalDate } from '@/shared/lib'
import classNames from 'classnames'
import { handleTextFreeClick } from '@/entities/card/lib/handleTextFreeClick.ts'
import s from './card.module.scss'

const BUTTONS_COUNT = 24

const createArrayFromNumber = (num: number) => Array.from(new Array(num)).map((_, index) => index)

// Generate content to showcase grid usage
const buttonsArray = createArrayFromNumber(BUTTONS_COUNT)

const defaultTitle = 'Default Title'
const defaultBody = 'Default Body'

type CardProps = Post & {
  onDelete?: () => unknown
}

export const Card = memo(
  ({ onDelete, status, createdAt, title = defaultTitle, body = defaultBody }: CardProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true)

    return (
      <article
        onClick={(event) => {
          if (isCollapsed) {
            setIsCollapsed(!isCollapsed)
          } else {
            handleTextFreeClick(
              event,
              () => {
                setIsCollapsed(true)
              },
              ['.' + s.collapseIndicator]
            )
          }
        }}
        className={classNames(s.card, { [s.collapsed]: isCollapsed })}
      >
        <header className={s.header}>
          <small className={s.collapseIndicator}>↑</small>

          <Chip
            className={s.statusChip}
            status={status}
            label={status}
          />

          <div className={s.cardMainInfo}>
            <small className={s.date}>{formatToLocalDate(createdAt)}</small>
            <h4 className={s.name}>{title}</h4>
            <p className={s.subject}>{body}</p>
          </div>
        </header>

        <div className={s.cardContent}>
          {buttonsArray.map((button) => (
            <Button
              variant={'danger'}
              className={s.removeButton}
              key={button}
              onClick={onDelete}
            >
              Remove {button}
            </Button>
          ))}
        </div>
      </article>
    )
  }
)
