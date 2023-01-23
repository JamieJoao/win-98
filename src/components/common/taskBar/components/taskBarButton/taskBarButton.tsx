import cn from 'classnames'

import './styles.scss'

interface IProps {
  iconUrl: string
  bold?: boolean
  label?: string
  active?: boolean
}

export const TaskBarButton = (props: IProps) => {
  const { bold, label, iconUrl, active } = props

  return (
    <button className={cn('w98-taskbar-button', bold && '--bold', active && '--active')}>
      <div className="w98-taskbar-button__content">
        { iconUrl && <img src={iconUrl} draggable={false} /> }
        <span>{ label }</span>
      </div>
    </button>
  )
}
