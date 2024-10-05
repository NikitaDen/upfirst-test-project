import { memo, ReactNode } from 'react'
import { Button, Header } from '@/shared/ui'
import classNames from 'classnames'
import s from './header.module.scss'

type HomeHeaderProps = {
  className?: string
  children?: ReactNode
}

export const HomeHeader = memo(({ className = '', children }: HomeHeaderProps) => {
  return (
    <Header className={classNames(s.homeHeader, { [className]: Boolean(className) })}>
      {children}

      <span>Header</span>

      <Button
        variant={'secondary'}
        className={s.headerButton}
      >
        Button
      </Button>
    </Header>
  )
})
