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

export const DraggableWindow = (props: IProps) => {
  const { data, position } = props
  const { program: { iconUrl, name }, minimized, size, lastCoords, uid } = data

  const dispatch = useAppDispatch()
  const { windowsStack, outOfFocus } = useAppSelector(state => state)
  const canDragRef = useRef<boolean>(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState({ left: 0, top: 0 })

  const focused = windowsStack[0].uid === uid && !outOfFocus

  useLayoutEffect(() => {
    containerRef.current = document.querySelector(SCREEN_CLASS)

    if (containerRef.current && elementRef.current) {
      setCoords({
        left: containerRef.current.clientWidth / 2 - elementRef.current.clientWidth / 2,
        top: (containerRef.current.clientHeight / 2 - elementRef.current.clientHeight / 2) - TASKBAR_HEIGHT,
      })
    }
  }, [])

  const coordsMemo = useMemo(() => {
    let auxCoords: { zIndex: number, left?: number, top?: number } = { zIndex: windowsStack.length - position }

    if (size === 'regular') {
      auxCoords = { ...auxCoords, ...coords }
    }

    return auxCoords
  }, [windowsStack, position, size, coords])

  const { elementRef, handleDragRef, getCoords: getWindowCoords } = useDrag({
    canDragRef,
    onDragStart() { },
    onDragEnd() { },
    onDragging(left, top) {
      setCoords({ left, top })
    },
  })

  const handleToggleMaximize = () => {
    const finalSize = size === 'fullscreen' ? 'regular' : 'fullscreen'

    dispatch(updateWindow({
      ...data,
      size: finalSize,
      lastCoords: canDragRef.current ? getWindowCoords() : lastCoords,
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
    <div
      className={
        cn('w98-float-window', `--${size}`, minimized && '--minimized')
      }
      ref={elementRef}
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
          ref={handleDragRef}
          useHandler>
          <ButtonControlWindow
            type='minimize'
            onClick={handleMinimize} />
          <ButtonControlWindow
            type='maximize'
            onClick={handleToggleMaximize} />
          <ButtonControlWindow
            type='close'
            style={{ marginLeft: 2 }}
            onClick={handleClose} />
        </HeaderWindow>

      </BordererPanel>
    </div>
  )
}
