import { } from 'react'

import { ButtonMinimize, ButtonMaximize, ButtonClose } from './components'
import { useDragDrop } from './useDragDrop'

import './styles.scss'
import './components/styles.scss'

interface IProps {
  iconUrl?: string
  coords: { top: number | string, left: number | string }
}

export const Window = (props: IProps) => {
  const { boxRef, handleRef } = useDragDrop()
  const { iconUrl, coords } = props

  const handleMaximize = () => {

  }

  const handleMinimize = () => {

  }

  const handleClose = () => {

  }

  return (
    <div className="w98-window" ref={boxRef} style={{ top: coords.top, left: coords.left }}>
      <div className="w98-window__content">
        <div className="w98-window__header">
          <div className="w98-window__header-handle" ref={handleRef}>
            {iconUrl && <img src={iconUrl} draggable={false} />}
            <span>(C:)</span>
          </div>

          <div className="w98-window-header__actions">
            <ButtonMinimize onClick={handleMinimize} />
            <ButtonMaximize onClick={handleMaximize} />
            <ButtonClose onClick={handleClose} />
          </div>
        </div>
        <div className="w98-window__body"></div>
        <div className="w98-window__footer"></div>
      </div>
    </div>
  )
}
