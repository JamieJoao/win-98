import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import { TaskBarButtonBase } from 'components'
import { programsList, IMenuItem } from './const'

import StartIcon from 'assets/icons/icon-windows-start.png'
import ShutDownIcon from 'assets/icons/monitor_black.png'
import './styles.scss'

interface IProps {
  children: JSX.Element
}

export const TaskBarButtonStart = () => {
  const [open, setOpen] = useState<boolean>(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: any) => {
    if (
      buttonRef.current?.contains(e.target) &&
      buttonRef.current === e.target.closest('.w98-start-menu')
    ) return

    setOpen(false)
  }

  const handleToggleMenu = () => {
    if (!open) {
      document.body.addEventListener('mousedown', handleMouseDown)
    }
    else {
      document.body.removeEventListener('mousedown', handleMouseDown)
    }

    setOpen(!open)
  }

  const recursiveItem = (sublist: IMenuItem[], customClass?: string) => {
    return sublist && (
      <div className={cn('w98-start-menu__item-wrapper', customClass)}>
        <StartMenuPanel>
          <ul className="w98-start-menu__list">
            {sublist.map((obj: IMenuItem) => (
              <li
                key={obj.id}
                className={cn('w98-start-menu__item', obj.sublist && '--expansible')}>
                <img src={obj.iconUrl} draggable={false} />
                <span>{obj.name}</span>

                {obj.sublist && recursiveItem(obj.sublist)}
              </li>
            ))}
          </ul>
        </StartMenuPanel>
      </div>
    )
  }

  return (
    <div className='w98-start-menu' ref={buttonRef}>
      {open && (
        <div className="w98-start-menu__wrapper">
          <StartMenuPanel>
            <>
              <div className="w98-start-menu__banner">
                <div className="w98-start-menu__banner-text">
                  <span>Windows</span>
                  <span>98</span>
                </div>
              </div>

              <ul className="w98-start-menu__list">
                {programsList.map(obj => (
                  <li
                    key={obj.id}
                    className={cn('w98-start-menu__item', obj.sublist && '--expansible')}>
                    <img src={obj.iconUrl} draggable={false} />
                    <span>{obj.name}</span>

                    {obj.sublist && recursiveItem(obj.sublist)}
                  </li>
                ))}

                <li className='w98-start-menu__separator'></li>

                <li
                  className="w98-start-menu__item">
                  <img src={ShutDownIcon} draggable={false} />
                  <span>Apagar</span>
                </li>
              </ul>
            </>
          </StartMenuPanel>
        </div>
      )}

      <TaskBarButtonBase
        className={cn('w98-start-menu__button', open && '--active')}
        iconUrl={StartIcon}
        label='Inicio'
        bold
        onClick={handleToggleMenu} />
    </div>
  )
}

export const StartMenuPanel = (props: IProps) => {
  const { children } = props

  return (
    <div className="w98-start-menu__panel">
      <div className="w98-start-menu__panel-content">
        {children}
      </div>
    </div>
  )
}
