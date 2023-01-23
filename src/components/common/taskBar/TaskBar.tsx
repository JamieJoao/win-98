import { useAppSelector } from 'redux-tk/store'
import { TaskBarButton } from './components'

import StartIcon from 'assets/icons/icon-start.svg'

import './styles.scss'

interface Props {

}

export const TaskBar = ({ }: Props) => {
  const windows = useAppSelector(state => state.windows)

  return (
    <div className="w98-taskbar">
      <div className="w98-taskbar__container">
        <TaskBarButton iconUrl={StartIcon} label='Inicio' bold />

        <div className="w98-taskbar__group">
          {windows.map((obj, index) => (
            <TaskBarButton
              key={index}
              iconUrl={obj.program.iconUrl}
              label={obj.program.name} />
          ))}
        </div>

        <div className="w98-taskbar__info">

        </div>
      </div>
    </div>
  )
}
