import { HTMLAttributes, memo } from 'react'
import classNames from 'classnames'
import s from './header.module.scss'

export const Header = memo(({ className, children, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <header
      className={classNames(className, { [s.header]: true })}
      {...props}
    >
      {children}
    </header>
  )
})
