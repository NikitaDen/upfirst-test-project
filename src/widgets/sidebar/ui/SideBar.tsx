import s from './SideBar.module.scss'
import { Menu } from './menu'
import { Button } from '../../../shared/ui/button'

export const SideBar = () => {
  return (
    <aside className={s.sidebar}>
      <Menu />

      <Button className={s.logoutButton}>Logout</Button>
    </aside>
  )
}
