import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'

import { IContextMenuItem } from 'types'
import { SCREEN_CLASS } from 'utils/const'
import { BordererPanel, Separator } from 'components'
import { closeContextMenu } from 'redux-tk/slice'
import { useAppSelector, useAppDispatch } from 'redux-tk/store'

import './styles.scss'

interface ICoords {
  left: number
  top: number
  sideHorizontal: 'right' | 'left'
}

export const ContextMenu = () => {
  const { items: contextMenuItems, position } = useAppSelector(state => state.contextMenu)
  const dispatch = useAppDispatch()
  const screenRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState<ICoords | null>(null)
  const [itemsMapped, setItemsMapped] = useState<IContextMenuItem[]>(contextMenuItems ?? [])

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
      sideHorizontal: left === finalLeft ? 'right' : 'left'
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

  const handleItemClick = (item: IContextMenuItem, isChildren?: boolean) => {
    if (!isChildren) {
      setItemsMapped(itemsMapped.map(obj => ({ ...obj, showed: obj.id === item.id })))
    }

    if (!item.subitems) console.log(item)
  }

  return (
    <div
      className={cn('w98-context-menu__wrapper', !coords && '--hide')}
      style={{ left: coords?.left, top: coords?.top }}
      ref={menuRef}>
      <BordererPanel
        type='window'
        className='w98-context-menu'>
        <ul className='w98-context-menu__list'>
          {itemsMapped.map(obj => (
            <div
              key={obj.id}
              className='w98-context-menu__list-wrapper'>
              {obj.separator
                ? (
                  <li className='w98-context-menu__separator'>
                    <Separator aligment='horizontal' />
                  </li>)
                : (
                  <li
                    className={cn('w98-context-menu__item-wrapper', obj.subitems && '--expansible')}
                    onClick={() => handleItemClick(obj)}>
                    <div className="w98-context-menu__item">
                      {obj.name}
                    </div>
                  </li>)}

              {obj.subitems && obj.showed && (
                <div className="w98-context-submenu__wrapper">
                  <BordererPanel
                    type='window'
                    className='w98-context-menu'>
                    <ul className='w98-context-menu__list'>
                      {obj.subitems?.map(obj => {
                        return obj.separator
                          ? (
                            <li
                              key={obj.id}
                              className='w98-context-menu__separator'>
                              <Separator aligment='horizontal' />
                            </li>)
                          : (
                            <li
                              key={obj.id}
                              className={cn('w98-context-menu__item-wrapper', obj.subitems && '--expansible')}
                              onClick={() => handleItemClick(obj, true)}>
                              <div className="w98-context-menu__item">
                                <span>{obj.name}</span>
                              </div>
                            </li>)
                      })}
                    </ul>
                  </BordererPanel>
                </div>
              )}
            </div>
          ))}
        </ul>
      </BordererPanel>
    </div >
  )
}