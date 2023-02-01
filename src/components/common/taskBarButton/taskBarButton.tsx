import { TaskBarButtonBase } from 'components'
import { ITaskBarButton } from 'types'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { updateWindow, changePositionWindow } from 'redux-tk/slice'

interface IProps {
  className?: string
  data: ITaskBarButton
  width: number
  onClick?: () => void
}

export const TaskBarButton = (props: IProps) => {
  const { data: { window: { uid, program: { iconUrl, name } } }, width, onClick } = props

  const dispatch = useAppDispatch()
  const { windowsStack, outOfFocus } = useAppSelector(state => state)

  const windowAbove = windowsStack[0]
  const linkedWindow = windowsStack.find(obj => obj.uid === uid)
  const active = windowAbove && windowAbove.uid === uid && !windowAbove.minimized

  const handleClick = () => {
    if (onClick) onClick()
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

  return (
    <TaskBarButtonBase
      className={`${active && '--active'}`}
      iconUrl={iconUrl}
      label={name}
      style={{ width }}
      onClick={handleClick} />
  )
}
