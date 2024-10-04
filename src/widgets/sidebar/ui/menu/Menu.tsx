import s from './menu.module.scss'
import { memo } from 'react'

export const Menu = memo(() => {
  return <nav className={s.menu}>Menu</nav>
})
