import cn from 'classnames'

import { IWindow } from 'types'
import { useAppDispatch } from 'redux-tk/store'
import { setKeyValue, updateWindow } from 'redux-tk/slice'

import './styles.scss'

interface IProps {
  iconUrl: string
  bold?: boolean
  label?: string
  active?: boolean
  data?: IWindow
  onClick?: () => void
}

export const TaskBarButton = (props: IProps) => {
  const { bold, label, iconUrl, active, data, onClick } = props

  const dispatch = useAppDispatch()

  const handleClick = () => {
    if (onClick) onClick()
    if (data) {
      dispatch(updateWindow({ ...data, minimized: false }))
      dispatch(setKeyValue({ key: 'activeWindow', value: data }))
    }
  }

  return (
    <button 
      className={cn('w98-taskbar-button', bold && '--bold', active && '--active')}
      onClick={handleClick}>
      <div className="w98-taskbar-button__content">
        { iconUrl && <img src={iconUrl} draggable={false} /> }
        <span>{ label }</span>
      </div>
    </button>
  )
}
