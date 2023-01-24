import { useEffect } from 'react'
import { addWindow } from 'redux-tk/slice'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import {
  TaskBar,
  DirectAccess,
  Window,
  Screen,
} from 'components'
import { IProgram } from 'types'

import './styles.scss'

export const Desktop = () => {
  const dispatch = useAppDispatch()
  const directsAccess = useAppSelector(state => state.directsAccess)
  const windowsStack = useAppSelector(state => state.windowsStack)

  const handleOpenIcon = (program: IProgram) => {
    dispatch(addWindow({
      program,
      size: 'regular',
      minimized: false,
      uid: new Date().valueOf()
    }))
  }

  return (
    <Screen>
      <div className="w98-desktop">

        <div className="w98-desktop__icon-group">
          {directsAccess.map(obj => (
            <DirectAccess
              key={obj.uid}
              url={obj.iconUrl}
              name={obj.name}
              onDoubleClick={() => handleOpenIcon(obj)} />
          ))}
        </div>

        {windowsStack.map((obj, index) => (
          <Window
            key={obj.program.uid}
            data={obj}
            position={index} />
        ))}

        <TaskBar />
      </div>
    </Screen>
  )
}