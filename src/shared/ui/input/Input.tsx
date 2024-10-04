import { InputHTMLAttributes, memo } from 'react'
import classNames from 'classnames'
import s from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
}

export const Input = memo(
  ({ variant = 'primary', className = '', disabled, ...rest }: InputProps) => {
    const inputClassNames = classNames(s.input, s[variant], className, { [s.disabled]: disabled })

    return (
      <input
        className={inputClassNames}
        disabled={disabled}
        {...rest}
      />
    )
  }
)
