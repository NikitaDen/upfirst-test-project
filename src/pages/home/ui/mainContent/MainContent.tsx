import { memo } from 'react'
import s from './mainContent.module.scss'

export const MainContent = memo(() => {
  return <main className={s.mainContent}>Main Content</main>
})
