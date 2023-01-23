import { useAppSelector } from 'redux-tk/store'
import { TaskBarButton } from './components'

import StartIcon from 'assets/icons/icon-start.svg'

import './styles.scss'

interface Props {

}

export const TaskBar = ({ }: Props) => {
  const windows = useAppSelector(state => state.windows)
  const activeWindow = useAppSelector(state => state.activeWindow)

  return (
    <div className="w98-taskbar" style={{ zIndex: windows.length + 1 }}>
      <div className="w98-taskbar__container">
        <TaskBarButton iconUrl={StartIcon} label='Inicio' bold />

        <div className="w98-taskbar__group">
          {windows.map((obj, index) => (
            <TaskBarButton
              key={index}
              iconUrl={obj.program.iconUrl}
              label={obj.program.name}
              active={obj.uid === activeWindow?.uid} />
          ))}
        </div>

        <div className="w98-taskbar__info">

        </div>
      </div>
    </div>
  )
}
