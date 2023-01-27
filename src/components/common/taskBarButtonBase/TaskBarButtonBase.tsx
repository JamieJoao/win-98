import { forwardRef } from 'react'
import cn from 'classnames'

import './styles.scss'

interface IProps {
  className?: string
  iconUrl?: string
  bold?: boolean
  label?: string
  width?: number
  style?: React.CSSProperties
  onClick?: (event: React.MouseEvent) => void
}

export const TaskBarButtonBase = forwardRef((props: IProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  const { className, iconUrl, bold, label, style, onClick } = props

  return (
    <button
      className={cn('w98-taskbar-button-base', bold && '--bold', className)}
      onClick={onClick}
      style={style}
      ref={ref}>
      <div className="w98-taskbar-button-base__content">
        {iconUrl && <img src={iconUrl} draggable={false} />}
        <span>{label}</span>
      </div>
    </button>
  )
})
