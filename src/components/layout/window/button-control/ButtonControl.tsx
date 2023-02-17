import cn from 'classnames'

import './ButtonControl.styles.scss'

type TButtonControl = 'minimize' | 'maximize' | 'restore' | 'close' | 'question'

interface ButtonControlProps {
  type: TButtonControl
  style?: React.CSSProperties
  onClick: () => void
}

export const ButtonControl = (props: ButtonControlProps) => {
  const { style, type, onClick } = props

  const handleClick = (e: React.MouseEvent) => {
    onClick()
  }

  return (
    <button
      className={cn('w98-button-window', `--${type}`)}
      style={{ ...style }}
      onClick={handleClick}
      title={type} />
  )
}
