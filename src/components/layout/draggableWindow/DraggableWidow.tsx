import cn from 'classnames'

import {
  BordererPanel,
  HeaderWindow,
  ButtonControlWindow,
  WindowAnchors,
} from 'components'
import { IWindow } from 'types'
import { useDraggableWindow } from './hooks/useDraggaleWindow'

import './styles.scss'

interface IProps {
  data: IWindow
  position: number
}

export const DraggableWindow = (props: IProps) => {
  const { data, position } = props
    , { program: { iconUrl, name, miniIconUrl }, minimized, size, lastCoords, uid } = data

  const {
    windowRef,
    coordsMemo,
    focused,
    startRef,
    // endRef,
    // shadowStyles,
    handleFocus,
    // handleResized,
    // handleRezise,
    handleMinimize,
    handleClose,
    handleToggleMaximize,
    handleResizeEnd,
  } = useDraggableWindow({ data, position })

  return (
    <>
      <div
        className={
          cn('w98-float-window', `--${size}`, minimized && '--minimized')
        }
        ref={windowRef}
        style={coordsMemo}
        onMouseDown={handleFocus}>

        {size === 'regular' && (
          <WindowAnchors onResizeEnd={handleResizeEnd} />
        )}

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
              style={{ marginLeft: 3 }}
              onClick={handleClose} />
          </HeaderWindow>

        </BordererPanel>
      </div>
    </>
  )
}
