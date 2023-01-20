import {
  TaskBar,
  Window,
  Icon,
} from 'components'

import './styles.scss'
import IconPencil from 'assets/icons/computer_user_pencil-1.png'
import IconMyPc from 'assets/icons/computer_explorer-5.png'

export const Desktop = () => {
  const handleOpenIcon = () => {
    /** CREAR STORE PARA ALMACENAR VENTANA NUEVA */
  }

  return (
    <div className="w98-desktop">

      {/* <Window iconUrl={IconPencil} /> */}

      <div className="w98-desktop__icon-group">
        <Icon url={IconMyPc} onClick={handleOpenIcon} />
      </div>

      <TaskBar />
    </div>
  )
}