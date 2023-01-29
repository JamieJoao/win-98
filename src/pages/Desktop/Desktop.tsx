import { useRef, useLayoutEffect } from 'react'
import { createWindow } from 'redux-tk/slice'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import {
  TaskBar,
  DirectAccess,
  Window,
  Screen,
  ContextMenu,
} from 'components'
import { IProgram, IContextMenuItem } from 'types'
import { useContextMenu } from 'hooks'

import './styles.scss'

const contextMenuItems: IContextMenuItem[] = [
  {
    id: 1,
    name: 'Arrange Icons',
    subitems: [
      {
        id: 1,
        name: 'Line up Icons',
      }
    ]
  },
  {
    id: 2,
    name: 'Line up Icons',
  }
]

export const Desktop = () => {
  const dispatch = useAppDispatch()
  const { setData } = useContextMenu()
  const directsAccess = useAppSelector(state => state.directsAccess)
  const windowsStack = useAppSelector(state => state.windowsStack)
  const screenRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    setData(contextMenuItems, screenRef)
  }, [])

  const handleOpenIcon = (program: IProgram) => {
    dispatch(createWindow(program))
  }

  return (
    <Screen>
      <div
        className="w98-desktop"
        ref={screenRef}>

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
            key={obj.uid}
            data={obj}
            position={index} />
        ))}

        <TaskBar />
      </div>

      <ContextMenu />
    </Screen>
  )
}