import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import {
  TaskBarButtonBase,
  BordererPanel,
  Separator,
} from 'components'
import { programsList, IMenuItem } from './const'

import StartIcon from 'assets/icons/icon-windows-start.png'
import './styles.scss'

interface IProps {
  children: JSX.Element
}

interface IPropsRecursive {
  sublist: IMenuItem[]
  show?: boolean
  onClickChildren: () => void
}

export const TaskBarButtonStart = () => {
  const [open, setOpen] = useState<boolean>(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [programsListMapped, setProgramsListMapped] = useState(programsList.map(obj => ({ ...obj, showed: false })))

  const closeAllMenus = () => {
    setProgramsListMapped(programsList.map(obj => ({ ...obj, showed: false })))
  }

  const handleMouseDown = (e: any) => {
    if (
      buttonRef.current?.contains(e.target) &&
      buttonRef.current === e.target.closest('.w98-start-menu')
    ) return

    closeAllMenus()
    setOpen(false)
  }

  const handleToggleMenu = () => {
    const selectedMethod = !open
      ? 'addEventListener'
      : 'removeEventListener'

    document.body[selectedMethod]('mousedown', handleMouseDown)

    if (open) closeAllMenus()
    setOpen(!open)
  }

  const handleClickOption = (menu: IMenuItem) => {
    setProgramsListMapped(
      programsList.map(obj => ({ ...obj, showed: obj.id === menu.id }))
    )
  }

  const handleClickChildren = () => {

  }

  return (
    <div className='w98-start-menu' ref={buttonRef}>
      {open && (
        <div className="w98-start-menu__wrapper">
          <BordererPanel
            classNameContent='w98-start-menu__borderer-content'
            type='window'>
            <>
              <div className={cn('w98-start-menu__banner')}>
                <div className="w98-start-menu__banner-text">
                  <span>Windows</span>
                  <span>98</span>
                </div>
              </div>

              <ul className="w98-start-menu__list">
                {programsListMapped.map(obj => (
                  <div className='w98-start-menu__list-main-wrapper' key={obj.id}>
                    {obj.separator
                      ? (<li className='w98-start-menu__separator'>
                        <Separator aligment='horizontal' />
                      </li>)
                      : (<li
                        className={cn('w98-start-menu__item', obj.sublist && '--expansible', obj.showed && '--active')}
                        onMouseEnter={() => handleClickOption(obj)}>
                        <img src={obj.iconUrl} draggable={false} />
                        <span>{obj.name}</span>
                      </li>)}

                    {obj.sublist && obj.showed && (
                      <RecursiveListMenu
                        sublist={obj.sublist}
                        show={obj.showed}
                        onClickChildren={handleClickChildren} />
                    )}
                  </div>
                ))}

                {/* <li className='w98-start-menu__separator'>
                  <Separator aligment='horizontal' />
                </li>

                <li
                  className="w98-start-menu__item">
                  <img src={ShutDownIcon} draggable={false} />
                  <span>Apagar</span>
                </li> */}
              </ul>
            </>
          </BordererPanel>
        </div>
      )}

      <TaskBarButtonBase
        className={cn('w98-start-menu__button', open && '--active')}
        iconUrl={StartIcon}
        label='Inicio'
        onClick={handleToggleMenu} />
    </div>
  )
}

export const RecursiveListMenu = (props: IPropsRecursive) => {
  const { sublist: programsList, show, onClickChildren } = props

  const [programsListMapped, setProgramsListMapped] = useState<IMenuItem[]>(programsList)

  const handleClickOption = (menu: IMenuItem) => {
    if (onClickChildren) onClickChildren()

    setProgramsListMapped(
      programsList.map(obj => ({ ...obj, showed: obj.id === menu.id }))
    )
  }

  const listMenu = (parentSublist: IMenuItem[], show: boolean = false) => (
    <div className={cn('w98-start-menu__list-wrapper', show && '--show')}>
      <BordererPanel
        classNameContent='w98-start-menu__borderer-content'
        type='window'>
        <ul className="w98-start-menu__list">
          {parentSublist.map((obj: IMenuItem) => (
            <div
              className='w98-start-menu__item-wrapper'
              key={obj.id}>
              {obj.separator
                ? (<li className='w98-start-menu__separator'>
                  <Separator aligment='horizontal' />
                </li>)
                : (<li
                  className={cn('w98-start-menu__item', obj.sublist && '--expansible', obj.showed && '--active')}
                  onMouseEnter={() => handleClickOption(obj)}>
                  <img src={obj.iconUrl} draggable={false} />
                  <span>{obj.name}</span>
                </li>)}

              {obj.sublist && obj.showed && (
                <RecursiveListMenu
                  sublist={obj.sublist}
                  show={obj.showed}
                  onClickChildren={onClickChildren} />
              )}
            </div>
          ))}
        </ul>
      </BordererPanel>
    </div>
  )

  return listMenu(programsListMapped, show)
}
