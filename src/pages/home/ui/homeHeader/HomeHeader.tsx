import { memo } from 'react'
import { Button, Header } from '@/shared/ui'
import s from './header.module.scss'

export const HomeHeader = memo(() => {
  return (
    <Header>
      <Button className={s.headerButton}>Header Button</Button>
    </Header>
  )
})
