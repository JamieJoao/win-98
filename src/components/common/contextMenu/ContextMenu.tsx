import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'

import { SCREEN_CLASS } from 'utils/const'
import { BordererPanel } from 'components'
import { closeContextMenu } from 'redux-tk/slice'
import { useAppSelector, useAppDispatch } from 'redux-tk/store'

import './styles.scss'

export const ContextMenu = () => {
  const { items: contextMenuItems, position } = useAppSelector(state => state.contextMenu)
  const dispatch = useAppDispatch()
  const screenRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState<{ left: number, top: number } | null>(null)

  useLayoutEffect(() => {
    screenRef.current = document.querySelector(SCREEN_CLASS)
    screenRef.current?.addEventListener('click', handleOutsideClick)

    return () => {
      screenRef.current?.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    const screen = screenRef.current
      , menu = menuRef.current
      , { left, offsetX, top, offsetY } = position

    if (!screen || !menu) return

    const finalLeft = left - (offsetX + menu.clientWidth > screen.clientWidth ? menu.clientWidth : 0)
      , finalTop = top - (offsetY + menu.clientHeight > screen.clientHeight ? menu.clientHeight : 0)

    setCoords({
      ...coords,
      left: finalLeft,
      top: finalTop,
    })
  }, [position])
  

  const handleOutsideClick = (e: any) => {
    const menu = menuRef.current

    if (
      menu &&
      menu.contains(e.target) &&
      menu === e.target.closest('.w98-context-menu__wrapper')
    ) {
      return
    }

    dispatch(closeContextMenu())
  }

  return (
    <div
      className={cn('w98-context-menu__wrapper', !coords && '--hide')}
      style={{ ...coords }}
      ref={menuRef}>
      <BordererPanel
        type='window'
        className='w98-context-menu'>
        <ul className='w98-context-menu__list'>
          {contextMenuItems?.map(obj => (
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
}