import { memo, useState } from 'react'
import { Post } from '@/entities/card/model'
import { Button, Chip } from '@/shared/ui'
import { formatToLocalDate } from '@/shared/lib'
import classNames from 'classnames'
import s from './card.module.scss'

const BUTTONS_COUNT = 24

const createArrayFromNumber = (num: number) => Array.from(new Array(num)).map((_, index) => index)

// Generate content to showcase flexbox usage
const buttonsArray = createArrayFromNumber(BUTTONS_COUNT)

const defaultTitle = 'Default Title'
const defaultBody = 'Default Body'

export const Card = memo(
  ({ status, createdAt, title = defaultTitle, body = defaultBody }: Post) => {
    const [isCollapsed, setIsCollapsed] = useState(true)

    return (
      <article
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={classNames(s.card, { [s.collapsed]: isCollapsed })}
      >
        <header className={s.header}>
          <Chip
            status={status}
            label={'Status'}
          />

          <div className={s.cardMainInfo}>
            <p className={s.name}>{title}</p>
            <p className={s.subject}>{body}</p>
          </div>

          <Chip
            status={'info'}
            label={formatToLocalDate(createdAt)}
          />
        </header>

        <div className={s.cardContent}>
          {buttonsArray.map((button) => (
            <Button key={button}>Control {button}</Button>
          ))}
        </div>
      </article>
    )
  }
)
