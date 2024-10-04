import React, { memo } from 'react'
import classNames from 'classnames'
import s from './chip.module.scss'

type Status = 'success' | 'error' | 'warning' | 'info'

type ChipProps = {
  status: Status

  /** The label or content to display inside the Chip */
  label: string

  className?: string
}

export const Chip: React.FC<ChipProps> = memo(({ status, label, className }) => {
  const chipClass = classNames(s.chip, s[status], className)

  return <span className={chipClass}>{label}</span>
})
