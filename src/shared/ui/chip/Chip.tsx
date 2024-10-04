import { memo } from 'react'
import classNames from 'classnames'
import { Status } from '@/shared/model'
import s from './chip.module.scss'

type ChipProps = {
  status: Status

  /** The label or content to display inside the Chip */
  label: string

  className?: string
}

export const Chip = memo(({ status, label, className }: ChipProps) => {
  const chipClass = classNames(s.chip, s[status], className)

  return <span className={chipClass}>{label}</span>
})
