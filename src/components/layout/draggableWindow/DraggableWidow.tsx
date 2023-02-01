import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { isMobile } from 'react-device-detect';

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
import { WindowAnchors } from 'components/common/windowAnchors/WindowAnchors'
import { useDragDrop } from 'hooks/useDragDrop';

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
    , { program: { iconUrl, name, miniIconUrl }, minimized, size, lastCoords, uid } = data

  const dispatch = useAppDispatch()
    , { windowsStack, outOfFocus } = useAppSelector(state => state)
    , [coords, setCoords] = useState<ICoords>({ left: 0, top: 0 })
    , [coordsShadow, setCoordsShadow] = useState<ICoords | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)
    , windowRef = useRef<HTMLDivElement | null>(null)


  const focused = windowsStack[0].uid === uid && !outOfFocus
    , shadowStyles = {
      ...coordsShadow,
      display: (coordsShadow && size === 'regular')
        ? 'block'
        : 'none'
    }

  useLayoutEffect(() => {
    containerRef.current = document.querySelector(SCREEN_CLASS)

    if (containerRef.current && windowRef.current) {
      const left = containerRef.current.clientWidth / 2 - windowRef.current.clientWidth / 2
        , top = ((containerRef.current.clientHeight - TASKBAR_HEIGHT) / 2 - windowRef.current.clientHeight / 2)

      setCoords({ left, top })
    }
  }, [])

  const coordsMemo = useMemo(() => {
    let auxCoords: { zIndex: number, left?: number, top?: number } = { zIndex: windowsStack.length - position }

    if (size === 'regular') {
      auxCoords = { ...auxCoords, ...coords }
    }

    return auxCoords
  }, [windowsStack, position, size, coords])

  const { startRef, endRef } = useDragDrop({
    onDragStart() { },
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

        {size === 'regular' && <WindowAnchors />}

        <BordererPanel
          type='window'
          className='w98-float-window__wrapper'
          classNameContent='w98-float-window__content'>

          <HeaderWindow
            focused={focused}
            title={name}
            icon={miniIconUrl ?? iconUrl}
            ref={startRef}
            useHandler={size === 'regular'}>
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
        ref={endRef}
        style={shadowStyles}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  )
}
