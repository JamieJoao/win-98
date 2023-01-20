import { TaskBarButton } from './components'

import StartIcon from 'assets/icons/icon-start.svg'
import NotePadIcon from 'assets/icons/notepad-3.png'

import './styles.scss'

interface Props {

}

export const TaskBar = ({ }: Props) => {
  const windowsOpenned = [1, 2, 3, 4]

  return (
    <div className="w98-taskbar">
      <div className="w98-taskbar__container">
        <TaskBarButton iconUrl={StartIcon} label='Start' bold />

        <div className="w98-taskbar__group">
          {windowsOpenned.map(obj => (
            <TaskBarButton key={obj} iconUrl={NotePadIcon} label={`Paint ${obj}`} />
          ))}
        </div>

        <div className="w98-taskbar__info">
          <TaskBarButton iconUrl={NotePadIcon} label='Paint' />
        </div>
      </div>
    </div>
  )
}
