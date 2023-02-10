import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'

import './Header.styles.scss'

interface IProps {
  title: string
  icon?: string
  useHandler?: boolean
  focused?: boolean
  children: React.ReactNode
}

export const HeaderWindow = forwardRef<any, IProps>(
  (props, ref) => {
    const { title, icon, children, useHandler, focused = true } = props

    const controlsRef = useRef<HTMLDivElement>(null)
    const [widthInfo, setWidthInfo] = useState<string>('')

    useLayoutEffect(() => {
      if (controlsRef.current) {
        setWidthInfo(`calc(100% - ${controlsRef.current.clientWidth}px)`)
      }
    }, [])

    return (
      <div className={cn('w98-header-window', focused && '--focused')}>
        <div
          className="w98-header-window__info"
          draggable={false}
          style={{ width: widthInfo }}>
          {icon && <img className='w98-header-window__info-icon' src={icon} draggable={false} />}

          <div className='w98-header-window__info-title-wrapper'>
            <div className='w98-header-window__info-title'>{title}</div>
          </div>
        </div>

        <div
          className="w98-header-window__handler"
          ref={ref}
          style={{ width: widthInfo, display: useHandler ? 'block' : 'none' }} />

        <div className="w98-header-window__controls" ref={controlsRef}>
          {children}
        </div>
      </div>
    )
  }
)
