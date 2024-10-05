import { Menu } from './menu'
import { Button } from '@/shared/ui'
import classNames from 'classnames'
import s from './sideBar.module.scss'

type SideBarProps = {
  className?: string
  onClose?: () => unknown
}

export const SideBar = ({ className = '', onClose }: SideBarProps) => {
  return (
    <aside className={classNames(s.sidebar, { [className]: Boolean(className) })}>
      <Menu onClose={onClose} />

      <Button className={s.logoutButton}>Logout</Button>
    </aside>
  )
}
