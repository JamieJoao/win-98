import { useRef, useState, useEffect } from 'react'
import cn from 'classnames'

import { IWindow } from 'types'
import { ButtonMinimize, ButtonMaximize, ButtonClose } from './components'
import { useDragDrop } from '../../../hooks/useDragDrop'
import { changePositionWindow, deleteWindow, minimizeWindow, setKeyValue, updateWindow } from 'redux-tk/slice'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'

import './styles.scss'
import './components/styles.scss'

interface IProps {
  data: IWindow
  position: number
}

export const Window = (props: IProps) => {
  const { data, position } = props
  const { program, minimized, size, lastCoords, uid } = data

  const dispatch = useAppDispatch()
  const windowsStack = useAppSelector(state => state.windowsStack)
  const { boxRef, handleRef, startDrag, getCurrentPosition, setPosition } = useDragDrop()

  const focused = windowsStack[0].uid === uid

  useEffect(() => {
    if (startDrag && size === 'fullscreen') {
      /** EN TEST */
      // handleToggleMaximize()
    }
  }, [startDrag])

  const handleToggleMaximize = () => {
    const finalSize = size === 'fullscreen' ? 'regular' : 'fullscreen'

    dispatch(updateWindow({
      ...data,
      size: finalSize,
      lastCoords: getCurrentPosition(),
    }))

    if (finalSize === 'fullscreen') {
      setPosition()
    } else {
      setPosition(lastCoords?.left, lastCoords?.top)
    }
  }

  const handleMinimize = () => {
    dispatch(minimizeWindow({ ...data, lastCoords: getCurrentPosition() }))
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
      className={cn('w98-window', `--${size}`, minimized && '--minimized', focused && '--focused')}
      ref={boxRef}
      onMouseDown={handleFocus}
      style={{ zIndex: windowsStack.length - position }}>
      <div className="w98-window__content">
        <div className="w98-window__header">
          <div className="w98-window__header-handle" ref={handleRef} onDoubleClick={handleToggleMaximize}>
            {program.iconUrl && <img src={program.iconUrl} draggable={false} />}
            <span>{program.name}</span>
          </div>

          <div className="w98-window-header__actions">
            <ButtonMinimize onClick={handleMinimize} />
            <ButtonMaximize onClick={handleToggleMaximize} />
            <ButtonClose onClick={handleClose} />
          </div>
        </div>
        <div className="w98-window__body"></div>
        <div className="w98-window__footer"></div>
      </div>
    </div>
  )
}
