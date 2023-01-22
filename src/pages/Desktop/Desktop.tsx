import { useEffect } from 'react'
import { fetchPrograms, addWindow } from 'redux-tk/slice'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import {
  TaskBar,
  Icon,
  Window,
  Screen,
} from 'components'
import { IProgram } from 'types'

import './styles.scss'

export const Desktop = () => {
  const dispatch = useAppDispatch()
  const programs = useAppSelector(state => state.programs)
  const windows = useAppSelector(state => state.windows)

  useEffect(() => {
    dispatch(fetchPrograms())
  }, [])

  const handleOpenIcon = (program: IProgram) => {
    dispatch(addWindow({ program, active: true, size: 'minimized' }))
  }

  return (
    <Screen>
      <div className="w98-desktop">

        <div className="w98-desktop__icon-group">
          {programs.map(obj => (
            <Icon
              key={obj.id}
              url={obj.iconUrl}
              name={obj.name}
              onDoubleClick={() => handleOpenIcon(obj)} />
          ))}
        </div>

        {windows.map(obj => (
          <Window key={obj.program.id} iconUrl={obj.program.iconUrl} coords={{ left: 0, top: 0 }} />
        ))}

        <TaskBar />
      </div>
    </Screen>
  )
}