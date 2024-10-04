import { SideBar } from '@/widgets/sidebar'
import { MainContent } from '@/pages/home/ui/mainContent'
import { HomeHeader } from '@/pages/home/ui/homeHeader'
import s from './home.module.scss'

export const HomePage = () => {
  return (
    <div className={s.home}>
      <SideBar />

      <div className={s.homeContent}>
        <HomeHeader />
        <MainContent />
      </div>
    </div>
  )
}
