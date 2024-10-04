import { ButtonHTMLAttributes, memo } from 'react'
import classNames from 'classnames'
import s from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
}

export const Button = memo(
  ({ children, className = '', disabled, variant = 'primary', ...props }: ButtonProps) => {
    const buttonClassNames = classNames(s.button, s[variant], className, { [s.disabled]: disabled })

    return (
      <button
        className={buttonClassNames}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)
