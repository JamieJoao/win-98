import cn from 'classnames'

import { ITaskBarButton } from 'types'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { setKeyValue, updateWindow, changePositionWindow } from 'redux-tk/slice'

import './styles.scss'

interface IProps {
  iconUrl?: string
  bold?: boolean
  label?: string
  data?: ITaskBarButton
  onClick?: () => void
}

export const TaskBarButton = (props: IProps) => {
  const { bold, label, iconUrl, data, onClick } = props

  const dispatch = useAppDispatch()
  const taskBarButtonsStack = useAppSelector(state => state.taskBarButtonsStack)
  const windowsStack = useAppSelector(state => state.windowsStack)

  const windowAbove = windowsStack[0]
  const active = windowAbove && windowAbove.uid === data?.window.uid && !windowAbove.minimized

  const handleClick = () => {
    if (onClick) onClick()
    if (data) {
      const { window } = data
      const { minimized, uid } = window
      const isFocused = windowAbove.uid === uid

      dispatch(updateWindow({ ...data.window, minimized: active }))
      dispatch(changePositionWindow({ uid: data.window.uid, destIndex: active ? windowsStack.length - 1 : 0 }))
    }
  }

  return (
    <button
      className={cn('w98-taskbar-button', bold && '--bold', active && '--active')}
      onClick={handleClick}>
      <div className="w98-taskbar-button__content">
        {iconUrl && <img src={iconUrl} draggable={false} />}
        <span>{label}</span>
      </div>
    </button>
  )
}
