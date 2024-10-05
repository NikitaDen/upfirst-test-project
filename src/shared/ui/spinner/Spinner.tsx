import { memo } from 'react'
import classNames from 'classnames'
import s from './spinner.module.scss'

type SpinnerProps = {
  size?: number
  className?: string
}

export const Spinner = memo(({ size = 32, className }: SpinnerProps) => {
  return (
    <div
      className={classNames(s.spinner, { [className]: Boolean(className) })}
      style={{ width: size, height: size }}
    >
      <div className={s.doubleBounce1} />
      <div className={s.doubleBounce2} />
    </div>
  )
})
