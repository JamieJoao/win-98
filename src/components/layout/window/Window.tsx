import { useRef, useState, useEffect } from 'react'
import cn from 'classnames'

import { IWindow } from 'types'
import { ButtonMinimize, ButtonMaximize, ButtonClose } from './components'
import { useDragDrop } from './useDragDrop'
import { updateWindow } from 'redux-tk/slice'
import { useAppDispatch } from 'redux-tk/store'

import './styles.scss'
import './components/styles.scss'

interface IProps {
  data: IWindow
  onClose?: () => void
}

export const Window = (props: IProps) => {
  const { data, onClose } = props
  const { program, active, minimized, size, lastCoords } = data

  const dispatch = useAppDispatch()
  const { boxRef, handleRef, startDrag, getCurrentPosition, setPosition } = useDragDrop()

  useEffect(() => {
    if (startDrag && size === 'fullscreen') {
      handleToggleMaximize()
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
    dispatch(updateWindow({
      ...data,
      lastCoords: getCurrentPosition(),
      minimized: true,
    }))
  }

  const handleClose = () => {
    if (onClose) onClose()
  }

  return (
    <div
      className={cn('w98-window', `--${size}`, minimized && '--minimized', active && '--active')}
      ref={boxRef}>
      <div className="w98-window__content">
        <div className="w98-window__header">
          <div className="w98-window__header-handle" ref={handleRef}>
            {program.iconUrl && <img src={program.iconUrl} draggable={false} />}
            <span>(C:)</span>
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
