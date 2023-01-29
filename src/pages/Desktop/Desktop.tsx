import { useRef, useLayoutEffect, useEffect } from 'react'
import { createWindow } from 'redux-tk/slice'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import {
  TaskBar,
  DirectAccess,
  Window,
  Screen,
  ContextMenu,
} from 'components'
import { IProgram } from 'types'
import { useContextMenu } from 'hooks'

import './styles.scss'
import { contextMenuItems } from './const'

export const Desktop = () => {
  const dispatch = useAppDispatch()
  const { setData } = useContextMenu()
  const { items } = useAppSelector(state => state.contextMenu)
  const directsAccess = useAppSelector(state => state.directsAccess)
  const windowsStack = useAppSelector(state => state.windowsStack)
  const screenRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
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

      <>
        {!!items.length && <ContextMenu />}
      </>
    </Screen>
  )
}