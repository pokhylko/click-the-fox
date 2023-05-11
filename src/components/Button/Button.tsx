import { FC, MouseEventHandler, ReactNode } from 'react'

import './Button.scss'

type Props = {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const Button: FC<Props> = ({
  children,
  onClick,
  type = 'button',
  ...props
}) => (
  <button className="button" type={type} onClick={onClick} {...props}>
    {children}
  </button>
)
