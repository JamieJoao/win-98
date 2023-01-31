import { useRef, useEffect } from 'react'

import { createWindow, setKeyValue } from 'redux-tk/slice'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { WINDOW_CLASS } from 'utils/const'
import {
  TaskBar,
  DirectAccess,
  DraggableWindow,
  Screen,
  ContextMenu,
} from 'components'
import { IProgram } from 'types'
import { useContextMenu } from 'hooks'
import { contextMenuItems } from './const'

import './styles.scss'

export const Desktop = () => {
  const dispatch = useAppDispatch()
  // const { setData } = useContextMenu()
  const { contextMenu: { items }, directsAccess, windowsStack, outOfFocus } = useAppSelector(state => state)
  const windowsInformationRef = useRef<{ length: number, outFocus: boolean }>({ length: windowsStack.length, outFocus: outOfFocus })
  const screenRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // setData(contextMenuItems, screenRef)
    document.body.addEventListener('mousedown', handleMouseDown)

    return () => document.body.removeEventListener('mousedown', handleMouseDown)
  }, [])

  useEffect(() => {
    windowsInformationRef.current = {
      length: windowsStack.length,
      outFocus: outOfFocus
    }
  }, [windowsStack, outOfFocus])

  const handleMouseDown = (e: MouseEvent) => {
    const { length, outFocus } = windowsInformationRef.current
    
    if (length && !outFocus) {
      const elementRef = document.elementFromPoint(e.clientX, e.clientY)

      /**
       * DETECTAMOS QUE NO ESTEMOS SOBRE UNA VENTANA
       */
      if (!elementRef?.closest(WINDOW_CLASS)) {
        dispatch(setKeyValue({ key: 'outOfFocus', value: true }))
      }
    }
  }

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
          <DraggableWindow
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