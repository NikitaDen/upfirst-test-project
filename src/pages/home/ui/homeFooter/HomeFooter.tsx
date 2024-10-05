import { memo } from 'react'
import { Button, Header } from '@/shared/ui'
import s from './footer.module.scss'

export const HomeFooter = memo(() => {
  return (
    <Header>
      <span>Footer</span>

      <Button
        variant={'secondary'}
        className={s.headerButton}
      >
        Help Center
      </Button>
    </Header>
  )
})
