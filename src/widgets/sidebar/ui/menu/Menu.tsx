import { memo } from 'react'
import classNames from 'classnames'
import { Button } from '@/shared/ui'
import s from './menu.module.scss'

type MenuProps = {
  className?: string
  onClose?: () => unknown
}

export const Menu = memo(({ className, onClose }: MenuProps) => {
  return (
    <nav className={classNames(s.menu, { [className]: Boolean(className) })}>
      <header>
        <span>Menu</span>

        {onClose && <Button onClick={onClose}>Close</Button>}
      </header>
    </nav>
  )
})
