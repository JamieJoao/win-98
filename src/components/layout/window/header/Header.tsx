import { forwardRef } from 'react'
import cn from 'classnames'

import { ButtonControl } from 'components'
import { Window } from 'types'
import { useHeader } from './useHeader'

import './Header.styles.scss'

interface HeaderProps {
  icon: string
  title: string
  window: Window
  focused: boolean
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { icon, title, window, focused } = props
  const { size, uid } = window
  const {
    handleMinimize
    , handleToggleMaximize
    , handleClose } = useHeader(size, uid)

  return (
    <div className={cn('w98-header', size === 'fullscreen' && '--no-events', focused && '--focused')}>
      <div className="w98-header__handler" ref={ref}>
        <img className='w98-header__handler-image' src={icon} alt="window-header-icon" />
        <h3 className='w98-header__handler-title'>{title}</h3>
      </div>
      <div className="w98-header__controls">
        <ButtonControl type='minimize' onClick={handleMinimize} />
        <ButtonControl type={size === 'fullscreen' ? 'restore' : 'maximize'} onClick={handleToggleMaximize} />

        <div className="w98-header__controls-separator" />

        <ButtonControl type='close' onClick={handleClose} />
      </div>
    </div>
  )
})
