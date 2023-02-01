import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'

import {
  BordererPanel,
  HeaderWindow,
  ButtonControlWindow,
} from 'components'
import { IWindow } from 'types'
import { useDrag } from 'hooks'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { changePositionWindow, deleteWindow, minimizeWindow, updateWindow } from 'redux-tk/slice'

import './styles.scss'
import { SCREEN_CLASS, TASKBAR_HEIGHT } from 'utils/const'

interface IProps {
  data: IWindow
  position: number
}

interface ICoords {
  left: number
  top: number,
}

export const DraggableWindow = (props: IProps) => {
  const { data, position } = props
  const { program: { iconUrl, name }, minimized, size, lastCoords, uid } = data

  const dispatch = useAppDispatch()
  const { windowsStack, outOfFocus } = useAppSelector(state => state)
  const [coords, setCoords] = useState<ICoords>({ left: 0, top: 0 })
  const [coordsShadow, setCoordsShadow] = useState<ICoords | null>(null)

  const canDragRef = useRef<boolean>(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const windowRef = useRef<HTMLDivElement | null>(null)


  const focused = windowsStack[0].uid === uid && !outOfFocus

  useLayoutEffect(() => {
    containerRef.current = document.querySelector(SCREEN_CLASS)

    if (containerRef.current && windowRef.current) {
      const left = containerRef.current.clientWidth / 2 - windowRef.current.clientWidth / 2
        , top = ((containerRef.current.clientHeight - TASKBAR_HEIGHT) / 2 - windowRef.current.clientHeight / 2)

      setCoords({ left, top })
      // setCoordsShadow({ left, top })
    }
  }, [])

  const coordsMemo = useMemo(() => {
    let auxCoords: { zIndex: number, left?: number, top?: number } = { zIndex: windowsStack.length - position }

    if (size === 'regular') {
      auxCoords = { ...auxCoords, ...coords }
    }

    return auxCoords
  }, [windowsStack, position, size, coords])

  const { handleStartRef, handleEndRef } = useDrag({
    canDragRef,
    onDragStart() {
      // console.log('coords', coords)
      // console.log('coords-shadow', coordsShadow)
    },
    onDragEnd(left, top) {
      setCoordsShadow(null)
      setCoords({ left, top })
    },
    onDragging(left, top) {
      setCoordsShadow({ left, top })
    },
  })

  const handleToggleMaximize = () => {
    const finalSize = size === 'fullscreen' ? 'regular' : 'fullscreen'

    dispatch(updateWindow({
      ...data,
      size: finalSize,
      // lastCoords: canDragRef.current ? getWindowCoords() : lastCoords,
    }))
  }

  const handleMinimize = () => {
    dispatch(minimizeWindow({ ...data }))
  }

  const handleClose = () => {
    dispatch(deleteWindow(uid))
  }

  const handleFocus = () => {
    if (!focused) {
      dispatch(changePositionWindow({ uid, destIndex: 0 }))
    }
  }

  return (
    <>
      <div
        className={
          cn('w98-float-window', `--${size}`, minimized && '--minimized')
        }
        ref={windowRef}
        style={coordsMemo}
        onMouseDown={handleFocus}>
        <BordererPanel
          type='window'
          className='w98-float-window__wrapper'
          classNameContent='w98-float-window__content'>

          <HeaderWindow
            focused={focused}
            title={name}
            icon={iconUrl}
            ref={handleStartRef}
            useHandler>
            <ButtonControlWindow
              type='minimize'
              onClick={handleMinimize} />
            <ButtonControlWindow
              type={size === 'regular' ? 'maximize' : 'restore'}
              onClick={handleToggleMaximize} />
            <ButtonControlWindow
              type='close'
              style={{ marginLeft: 2 }}
              onClick={handleClose} />
          </HeaderWindow>

        </BordererPanel>
      </div>

      <div
        className="w98-float-window__shadow"
        ref={handleEndRef}
        style={{ ...coordsShadow, display: coordsShadow ? 'block' : 'none' }}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  )
}
