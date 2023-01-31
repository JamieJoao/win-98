import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'

import './styles.scss'

interface IProps {
  title: string
  icon?: string
  children: JSX.Element | JSX.Element[]
  useHandler?: boolean
  focused?: boolean
}

export const HeaderWindow = forwardRef<any, IProps>(
  (props, ref) => {
    const { title, icon, children, useHandler, focused = true } = props

    const infoRef = useRef<HTMLDivElement>(null)
    const [widthInfo, setWidthInfo] = useState<number>(0)

    useLayoutEffect(() => {
      if (infoRef.current) {
        setWidthInfo(infoRef.current.clientWidth)
      }
    }, [])

    return (
      <div className={cn('w98-header-window', focused && '--focused')}>
        <div className="w98-header-window__info" ref={infoRef}>
          {icon && <img className='w98-header-window__info-icon' src={icon} draggable={false} />}
          <span className='w98-header-window__info-title'>{title}</span>
        </div>

        {useHandler && (
          <div
            className="w98-header-window__handler"
            ref={ref}
            style={{ width: widthInfo }} />
        )}

        <div className="w98-header-window__controls">
          {children}
        </div>
      </div>
    )
  }
)
