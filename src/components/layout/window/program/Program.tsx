import cn from 'classnames'

import { Window } from 'types'
import { Header, WindowAnchors } from 'components'
import { useProgram } from './useProgram'

import './Program.styles.scss'

interface ProgramProps {
  data: Window
  index: number
}

export const Program = (props: ProgramProps): JSX.Element => {
  const { data: window, index: indexInStack } = props
    , { file: { name, icon }, minimized, size } = window

  const {
    stylesForWindow
    , headerRef
    , windowRef
    , handleResized
    , handleMouseDown
    , focused } = useProgram(window, indexInStack)

  /**
   * HAY UN PROBLEMA AL MINIMIZAR CUANDO LA VENTANA ESTÁ MAXIMIZADA
   * SE DEBE AL FOCUS
   * CUANDO MUESTRO LA WINDOW DESDE EL TASKBAR, NO SE ENFOCA Y SALE GRIS
   */

  return (
    <div
      className={cn('w98-program', minimized && '--minimized', `--${size}`)}
      onMouseDownCapture={handleMouseDown}
      ref={windowRef}
      style={stylesForWindow}>

      <div className="w98-program__content">
        <Header
          icon={icon!}
          title={`${name} - ${window.uid}`}
          window={window}
          focused={focused!}
          ref={headerRef} />
      </div>

      {/* {size === 'regular' && <WindowAnchors onResizeEnd={handleResized} />} */}
    </div>
  )
}
