import { HTMLAttributes, memo } from 'react'
import classNames from 'classnames'
import s from './footer.module.scss'

export const Footer = memo(({ className, children, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <footer
      className={classNames(className, { [s.footer]: true })}
      {...props}
    >
      {children}
    </footer>
  )
})
