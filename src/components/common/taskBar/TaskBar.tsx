import { setKeyValue } from 'redux-tk/slice'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { TaskBarButton } from 'components'

import StartIcon from 'assets/icons/icon-start.svg'
import './styles.scss'

export const TaskBar = () => {
  const dispatch = useAppDispatch()
  const windowsStack = useAppSelector(state => state.windowsStack)
  const activeWindow = useAppSelector(state => state.activeWindow)

  const handleClickStart = () => {
    dispatch(setKeyValue({ key: 'activeWindow', value: null }))
  }

  return (
    <div className="w98-taskbar" style={{ zIndex: windowsStack.length + 1 }}>
      <div className="w98-taskbar__container">
        <TaskBarButton
          iconUrl={StartIcon}
          label='Inicio'
          bold
          onClick={handleClickStart} />

        <div className="w98-taskbar__group">
          {windowsStack.map((obj, index) => (
            <TaskBarButton
              key={index}
              iconUrl={obj.program.iconUrl}
              label={obj.program.name}
              active={obj.uid === activeWindow?.uid}
              data={obj} />
          ))}
        </div>

        <div className="w98-taskbar__info">

        </div>
      </div>
    </div>
  )
}
