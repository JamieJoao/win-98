import { useDispatch, useSelector } from 'react-redux'

import { setActiveWindow, addWindow } from 'context/actions'
import { IRootState } from 'context/types/types.state'
import {
  TaskBar,
  Window,
  Icon,
} from 'components'

import './styles.scss'
import IconPencil from 'assets/icons/directory_favorites_small-5.png'
import IconMyPc from 'assets/icons/computer_explorer-5.png'

export const Desktop = () => {
  const windows = useSelector<IRootState>(state => state.windows)
  const dispatch = useDispatch()

  const handleOpenIcon = () => {
    // dispatch(setActiveWindow({ title: 'Mi Pc', icon: IconPencil, buttons: [] }))
    dispatch(addWindow({ title: 'Mi Pc', icon: IconPencil, buttons: [] }))
  }

  console.log('windows', windows)

  return (
    <div className="w98-desktop">

      <Window iconUrl={IconPencil} coords={{ top: 100, left: 100 }} />

      <div className="w98-desktop__icon-group">
        <Icon url={IconMyPc} onDoubleClick={handleOpenIcon} />
      </div>

      <TaskBar />
    </div>
  )
}