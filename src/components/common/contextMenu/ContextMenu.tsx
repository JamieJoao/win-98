import { useEffect, RefObject, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'

import { IContextMenuItem } from 'types'
import { BordererPanel } from 'components'
import { useAppSelector } from 'redux-tk/store'

import './styles.scss'

interface IProps {

}

export const ContextMenu = (props: IProps) => {
  const { } = props
  const { items: contextMenuItems, position } = useAppSelector(state => state.contextMenu)
  const screenRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState<{ left: number, top: number }>({ left: 0, top: 0 })

  useLayoutEffect(() => {
    screenRef.current = document.querySelector('.w98-screen__content')

    const handleContextMenu = (e: MouseEvent) => {
      console.log(e)
      e.preventDefault()
    }

    if (menuRef.current) {
      menuRef.current.addEventListener('contextmenu', handleContextMenu)
    }

    return () => menuRef.current?.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  useEffect(() => {
    const screen = screenRef.current
      , menu = menuRef.current
      , { left, offsetX, top, offsetY } = position

    if (!screen || !menu) return

    setCoords({
      left: left - (offsetX + menu.clientWidth > screen.clientWidth ? menu.clientWidth : 0),
      top: top - (offsetY + menu.clientHeight > screen.clientHeight ? menu.clientHeight : 0),
    })
  }, [position])

  return contextMenuItems?.length
    ? (
      <div
        className="w98-context-menu__wrapper"
        style={{ ...coords }}
        ref={menuRef}>
        <BordererPanel
          className='w98-context-menu'>
          <ul className='w98-context-menu__list'>
            {contextMenuItems.map(obj => (
              <li
                key={obj.id}
                className={cn('w98-context-menu__item-wrapper', obj.subitems && '--expansible')}>
                <div className="w98-context-menu__item">
                  {obj.name}
                </div>
              </li>
            ))}
          </ul>
        </BordererPanel>
      </div>
    )
    : null
}