import cn from 'classnames'

import './styles.scss'

interface IProps {
  iconUrl: string
  bold?: boolean
  label?: string
}

export const TaskBarButton = (props: IProps) => {
  const { bold, label, iconUrl } = props

  return (
    <button className={cn('w98-taskbar-button', bold && '--bold',)}>
      <div className="w98-taskbar-button__content">
        { iconUrl && <img src={iconUrl} draggable={false} /> }
        <span>{ label }</span>
      </div>
    </button>
  )
}
