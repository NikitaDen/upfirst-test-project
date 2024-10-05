import { Menu } from './menu'
import { Button } from '@/shared/ui'
import s from './SideBar.module.scss'

export const SideBar = () => {
  return (
    <aside className={s.sidebar}>
      <Menu />

      <Button className={s.logoutButton}>Logout</Button>
    </aside>
  )
}
