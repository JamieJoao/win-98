import cn from 'classnames'

import { ITaskBarButton } from 'types'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { updateWindow, changePositionWindow } from 'redux-tk/slice'

import './styles.scss'

interface IProps {
  className?: string
  iconUrl?: string
  bold?: boolean
  label?: string
  data?: ITaskBarButton
  width?: number
  onClick?: () => void
}

export const TaskBarButton = (props: IProps) => {
  const { className, bold, label, iconUrl, data, width, onClick } = props

  const dispatch = useAppDispatch()
  const windowsStack = useAppSelector(state => state.windowsStack)

  const windowAbove = windowsStack[0]
  const active = windowAbove && windowAbove.uid === data?.window.uid && !windowAbove.minimized

  const handleClick = () => {
    if (onClick) onClick()
    if (data) {
      const linkedWindow = windowsStack.find(obj => obj.uid === data.window.uid)

      if (linkedWindow) {
        dispatch(changePositionWindow({
          uid: linkedWindow.uid,
          destIndex: active
            ? windowsStack.length - 1
            : 0
        }))
        dispatch(updateWindow({ ...linkedWindow, minimized: active }))
      }
    }
  }

  return (
    <button
      className={cn('w98-taskbar-button', bold && '--bold', active && '--active', className)}
      onClick={handleClick}
      style={{ width }}>
      <div className="w98-taskbar-button__content">
        {iconUrl && <img src={iconUrl} draggable={false} />}
        <span>{label}</span>
      </div>
    </button>
  )
}
