import { SideBar } from '@/widgets/sidebar'
import { MainContent } from '@/pages/home/ui/mainContent'
import { HomeHeader } from '@/pages/home/ui/homeHeader'
import { HomeFooter } from '@/pages/home/ui/homeFooter'
import { Button } from '@/shared/ui'
import { useState } from 'react'
import classNames from 'classnames'
import s from './home.module.scss'

export const HomePage = () => {
  const [isMenuShownOnSmallScreen, setIsMenuShownOnSmallScreen] = useState(false)

  return (
    <div className={s.home}>
      <SideBar
        onClose={() => setIsMenuShownOnSmallScreen(false)}
        className={classNames(s.homeSideBar, {
          [s.homeSideBarOpenFullScreen]: isMenuShownOnSmallScreen,
        })}
      />

      <div className={s.homeContent}>
        <HomeHeader className={s.homeHeader}>
          <Button
            className={s.menuButton}
            onClick={() => setIsMenuShownOnSmallScreen(!isMenuShownOnSmallScreen)}
          >
            Menu
          </Button>
        </HomeHeader>

        <MainContent />

        <HomeFooter />
      </div>
    </div>
  )
}
