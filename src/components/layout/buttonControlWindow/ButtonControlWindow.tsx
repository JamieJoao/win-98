import cn from 'classnames'

import './styles.scss'

type TButtonControl = 'minimize' | 'maximize' | 'unmaximize' | 'close' | 'question'

interface IProps {
  type: TButtonControl
  style?: React.CSSProperties
  onClick: () => void
}

export const ButtonControlWindow = (props: IProps) => {
  const { style, type, onClick } = props

  const handleClick = (e: React.MouseEvent) => {
    onClick()
  }

  return (
    <button
      className={cn('w98-button-window', `--${type}`)}
      style={{ ...style }}
      onClick={handleClick} />
  )
}
