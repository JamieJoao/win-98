import { useLayoutEffect, useMemo, useRef } from 'react'

import { AccessLink, Window } from 'types'
import { useFileExplorer } from 'hooks'
import { isFolder, SCREEN_CLASS, WINDOW_CLASS } from 'utils'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { manageWindow } from 'redux-tk/slice'

const DESKTOP_PATH = 'C\\Windows\\Desktop'
  , SIZE_BOX = 70
  , SCREEN_HEIGHT = 480
  , LINKS_PER_COLUMN = parseInt(String(SCREEN_HEIGHT / SIZE_BOX))
let counterX = 0
  , counterY = 0

type HandleMouseEvent = { target: HTMLElement } & React.MouseEvent<HTMLDivElement>
type WindowsList = { data: Window, index: number, key: string }

export const useDesktop = () => {
  const dispatch = useAppDispatch()
  const { windowsStack } = useAppSelector(state => state)
  const { searchFile } = useFileExplorer()
  const screenRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    screenRef.current = document.querySelector(SCREEN_CLASS)
  }, [])

  const windowsList: WindowsList[] = useMemo(() => {
    return (
      windowsStack
        .map<WindowsList>((obj, index) => ({
          data: obj,
          key: obj.uid,
          index,
        }))
    )
  }, [windowsStack])

  /**
   * SI DESKTOP FOLDER ES UNDEFINED
   * NO SE HA CARGADO BIEN LA CARPETA DESKTOP
   * Y EN EL COMPONENTE DEBO MOSTRAR EL ERROR
   */
  const desktopLinks: AccessLink[] | undefined = useMemo(() => {
    const folder = searchFile(DESKTOP_PATH)

    if (folder) {
      return isFolder(folder)
        ? folder
          .files
          .map(obj => {
            const x = counterX * SIZE_BOX
            const y = counterY++ * SIZE_BOX

            if (counterY === LINKS_PER_COLUMN) {
              counterY = 0
              counterX++
            }

            return {
              ...obj,
              position: { left: x, top: y }
            }
          })
        : undefined
    }
  }, [searchFile])

  const handleMouseDown = (e: HandleMouseEvent) => {
    const topWindow = windowsStack[0]

    if (
      topWindow &&
      topWindow.focused &&
      !e.target.closest(WINDOW_CLASS)) {
      dispatch(manageWindow('unfocused'))
    }
  }

  return {
    desktopLinks,
    windowsList,

    handleMouseDown,
  }
}
