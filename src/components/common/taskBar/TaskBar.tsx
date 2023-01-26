import { setKeyValue } from 'redux-tk/slice'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { TaskBarButton } from 'components'

import StartIcon from 'assets/icons/icon-start.svg'
import './styles.scss'

export const TaskBar = () => {
  const dispatch = useAppDispatch()
  const taskBarButtonsStack = useAppSelector(state => state.taskBarButtonsStack)

  const handleClickStart = () => {
    dispatch(setKeyValue({ key: 'activeWindow', value: null }))
  }

  return (
    <div className="w98-taskbar" style={{ zIndex: taskBarButtonsStack.length + 1 }}>
      <div className="w98-taskbar__container">
        <TaskBarButton
          iconUrl={StartIcon}
          label='Inicio'
          bold
          onClick={handleClickStart} />

        <div className="w98-taskbar__group">
          {taskBarButtonsStack.map((obj, index) => {
            const { window: { program } } = obj
            return (
              <TaskBarButton
                key={index}
                iconUrl={program.iconUrl}
                label={program.name}
                data={obj} />
            )
          })}
        </div>

        <div className="w98-taskbar__info">

        </div>
      </div>
    </div>
  )
}
